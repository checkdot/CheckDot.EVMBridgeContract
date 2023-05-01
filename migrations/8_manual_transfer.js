const Bridge = artifacts.require('EVMBridge');

module.exports = async function (deployer, network, accounts) {
    if (network == "development") return ;

    if (network == "bsc") {
        const bridgeDeployed = await Bridge.deployed();
        const ERC20Contract = artifacts.require('ERC20Test');

        const erc20Address = '0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE';
        const erc20 = await ERC20Contract.at(erc20Address);

        await erc20.approve(bridgeDeployed.address, web3.utils.toWei("10"), { from: accounts[0] });
        await bridgeDeployed.deposit(erc20Address, web3.utils.toWei("10"), { from: accounts[0] });
    }

    if (network == "eth") {
        // const bridgeDeployed = await Bridge.deployed();

        // const bridgeInfos = {
        //     name: 'BSC',
        //     addr: '0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE'
        // };
        // await bridgeDeployed.addOneBridge(bridgeInfos.name, bridgeInfos.addr);
    }
};