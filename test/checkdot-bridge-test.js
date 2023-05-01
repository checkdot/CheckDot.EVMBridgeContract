const truffleAssert = require('truffle-assertions');
const contractTruffle = require('truffle-contract');
const { toWei, toBN } = web3.utils;
const timeHelper = require('./utils/index');

/* CheckDotInsuranceContract Artifact */
const EVMBridgeContract = artifacts.require('EVMBridge');
const ERC20TestContract = artifacts.require('ERC20Test');

contract('EVMBridgeContract', async (accounts) => {
  let bridge;
  let owner;
  let tester;

  let snapShotId;

  let erc20WETH;
  let erc20DAI;
  let erc20Pair;

  before(async () => {
    snapShotId = await timeHelper.takeSnapshot();

    erc20 = await ERC20TestContract.new({ from: accounts[0] });

    erc20WETH = await ERC20TestContract.new({ from: accounts[0] });
    erc20DAI = await ERC20TestContract.new({ from: accounts[0] });
    erc20Pair = await ERC20TestContract.new({ from: accounts[0] });

    const dex = {
      in: erc20WETH.address, // in (WETH)
      out: erc20DAI.address, // out (DAI) Important Only 18 decimals!
      pool: erc20Pair.address // DAI/WETH uniswap v2 Pair
    };

    await erc20WETH.transfer(dex.pool, web3.utils.toWei('1', 'ether')); // 1 WETH
    await erc20DAI.transfer(dex.pool, web3.utils.toWei('1700', 'ether')); // 1700 DAI

    bridge = await EVMBridgeContract.new(
      "BSC",
      erc20.address,
      '10000000000000000000', // 10 USD cost BRIDGE ETH to BSC
      '1',
      dex.in,
      dex.out,
      dex.pool,
      { from: accounts[0] }
    );

    console.log('Token TST address:', erc20.address);
    console.log('Bridge address:', bridge.address);
    // accounts
    owner = accounts[0];
    console.log('Owner:', owner);
    tester = accounts[1]
    console.log('Tester:', tester);
  });

  after(async () => {
    await timeHelper.revertToSnapShot(snapShotId);
  });

  it('Owner Should account[0]', async () => {
    const ownerAddress = await bridge.owner();
    assert.equal(owner, ownerAddress, 'Owner address');
  });

  it('TST Should be added in the bridge', async () => {
    const bridgeTokenAddress = await bridge.token();
    assert.equal(erc20.address, bridgeTokenAddress, 'TST address');
  });

  it('BSC chain Should be source of the bridge', async () => {
    const bridgeChainName = await bridge.chain();
    assert.equal('BSC', bridgeChainName, 'SOURCE CHAIN BSC ERROR');
  });

  it('Transfer Cost Should be 0.0058823529411764 ETH', async () => {
    const bridgeFeesInETH = await bridge.getFeesInETH();
    assert.equal(bridgeFeesInETH.toString(), web3.utils.toWei('0.0058823529411764', 'ether'), 'Transfer cost');
  });

  it('Fee percentage on token should be 1 %', async () => {
    const feesInCDTPercentage = await bridge.feesInCDTPercentage();
    assert.equal(feesInCDTPercentage.toString(), '1', 'Fee percentage');
  });

  // // 1. ADD BRIGE
  // it('Add one ETH Bridge and verify exists', async () => {
  //   const bridgeInfos = {
  //     name: 'ETH',
  //     addr: '0x961a14bEaBd590229B1c68A21d7068c8233C8542'
  //   };
  //   await bridge.addOneBridge(bridgeInfos.name, bridgeInfos.addr);
    
  //   const bridgeEthAddress = await bridge.bridges(bridgeInfos.name);

  //   assert.equal(bridgeEthAddress.chain.toString(), bridgeInfos.name, 'ETH Bridge doen\'t exists');
  //   assert.equal(bridgeEthAddress.addr.toString(), bridgeInfos.addr, 'ETH Bridge doen\'t exists');
  // });

  it('Add bridge balance 10', async () => {
    await erc20.approve(bridge.address, toWei("10"), { from: owner });
    await bridge.deposit(erc20.address, toWei("10"), { from: owner });

    const balance = await erc20.balanceOf(bridge.address);

    assert.equal(web3.utils.fromWei(balance).toString(), "10", 'Locked quantity');
  });

  it('Test Bridge user', async () => {
    await erc20.approve(bridge.address, toWei("1"), { from: owner });
    await bridge.initTransfer(toWei("1"), "ETH", `data->${owner}`, { from: owner, value: toWei("0.1") });

    const bridgeFeesInCDT = await bridge.bridgeFeesInCDT();
    assert.equal(web3.utils.fromWei(bridgeFeesInCDT).toString(), "0.01", 'Fees quantity after initTransfer');
  });

  it('get Lasts Transfers', async () => {
    let lastTransfers = await bridge.getLastsTransfers(100);

    assert.equal(lastTransfers.length, 1, 'EMPTY Transfers');
  });

  it('Transfer from ETH to BSC', async () => {
    await bridge.depositETH(toWei("0.1"), {to: bridge.address, from: owner, value: web3.utils.toWei('0.1')});
    
    const balanceOfBridge = await bridge.balance();
    assert.equal(web3.utils.fromWei(balanceOfBridge).toString(), "0.2", 'Bridge NATIV BALANCE');

    await bridge.addTransfersFrom(['ETH'], [tester], [toWei("1")], ['0x27fae1dd902d6c005d02736be81eb2699ccba00e47107ab129f10b946066635f']);

    const balance = await erc20.balanceOf(tester);
    assert.equal(web3.utils.fromWei(balance).toString(), "1", 'Received quantity');
  });

  it('Withdraw fees', async () => {
    const baseBalance = await erc20.balanceOf(owner);
    await bridge.collectCDTFees({ from: owner });

    const balance = await erc20.balanceOf(owner);
    assert.equal(web3.utils.fromWei(balance.sub(baseBalance)).toString(), "0.01", 'Received quantity');
  });

  it('Withdraw token Unauthorized', async () => {
    // const baseBalance = await erc20.balanceOf(owner);
    const balanceOfContract = await erc20.balanceOf(owner);

    try {

    await bridge.withdraw(erc20.address, balanceOfContract, { from: owner });

    } catch (e) {
      if (!e.toString().includes('15_DAYS_MAXIMUM_UNLOCKED_PERIOD')) {
        console.log(e);
        assert.equal(false, true, '15_DAYS_MAXIMUM_UNLOCKED_PERIOD NOT FOUND');
      }
    }
  });

  it('Withdraw token 3 days later', async () => {
    const baseBalance = await erc20.balanceOf(owner);
    const balanceOfContract = await erc20.balanceOf(bridge.address);

    await bridge.askWithdraw({ from: owner });
    await timeHelper.advanceTimeAndBlock(86400 * 3); // 3 days later

    try {

    await bridge.withdraw(erc20.address, balanceOfContract, { from: owner });

    } catch (e) {
      if (e.toString().includes('15_DAYS_MAXIMUM_UNLOCKED_PERIOD')) {
        console.log(e);
        assert.equal(false, true, 'Error withdraw');
      }
    }
    const balance = await erc20.balanceOf(owner);
    assert.equal(web3.utils.fromWei(balance.sub(baseBalance)).toString(), "9.99", 'Received quantity');
  });
  
});