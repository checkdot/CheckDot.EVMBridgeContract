const Bridge = artifacts.require('EVMBridge');

module.exports = async function (deployer, network, accounts) {
    if (network == "development") return ;

    if (network == "bsc") {
        const bridgeDeployed = await Bridge.deployed();
        const ERC20Contract = artifacts.require('ERC20Test');

        const erc20Address = '0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE';
        const erc20 = await ERC20Contract.at(erc20Address);

        await erc20.approve(bridgeDeployed.address, web3.utils.toWei("10"), { from: accounts[0] });
        await bridgeDeployed.addTransfersFrom(['ETH'], '0x961a14bEaBd590229B1c68A21d7068c8233C8542', web3.utils.toWei("10"), { from: accounts[0] });
    }

    if (network == "eth") {
        const bridgeDeployed = await Bridge.deployed();

        const dex = {
            in: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // in (WETH)
            out: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // out (DAI) Important Only 18 decimals!
            pool: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11' // DAI/WETH uniswap v2 Pair
        };
        await bridgeDeployed.setDex(
            true, // enable
            dex.in, // in (WETH)
            dex.out, // out (USDC)
            dex.pool); // pool

        // let feesInDollar = (await bridgeDeployed.feesInDollar()).toString();

        await bridgeDeployed.updateTransferCostFromPool('10000000000000000000', dex.in, dex.out, dex.pool);
    }
};