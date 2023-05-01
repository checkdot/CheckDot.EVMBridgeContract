const Bridge = artifacts.require('EVMBridge');

module.exports = async function (deployer, network, accounts) {
    if (network == "development") return ;

    if (network == "bsc") {
        const bridgeDeployed = await Bridge.deployed();
        
        await bridgeDeployed.changeProgram('0x961a14bEaBd590229B1c68A21d7068c8233C8542', { from: accounts[0] });
    }

    if (network == "eth") {
        const bridgeDeployed = await Bridge.deployed();

        await bridgeDeployed.changeProgram('0x961a14bEaBd590229B1c68A21d7068c8233C8542', { from: accounts[0] });
    }
};