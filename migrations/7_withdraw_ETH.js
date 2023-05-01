const Bridge = artifacts.require('EVMBridge');

module.exports = async function (deployer, network, accounts) {
    if (network == "development") return ;

    if (network == "bsc") {
        const bridgeDeployed = await Bridge.deployed();
        const balanceOfBridge = await bridgeDeployed.balance();

        await bridgeDeployed.withdrawETH(balanceOfBridge.toString(), { from: accounts[0] });
    }

    if (network == "eth") {
        const bridgeDeployed = await Bridge.deployed();
        const balanceOfBridge = await bridgeDeployed.balance();

        await bridgeDeployed.withdrawETH(balanceOfBridge.toString(), { from: accounts[0] });
    }
};