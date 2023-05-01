const Bridge = artifacts.require('EVMBridge');

module.exports = async function (deployer, network, accounts) {
    if (network == "development") return ;

    if (network == "bsc") {
        const bridgeDeployed = await Bridge.deployed();

        const bridgeInfos = {
            name: 'ETH',
            addr: '0xCdB37A4fBC2Da5b78aA4E41a432792f9533e85Cc'
        };
        await bridgeDeployed.addOneBridge(bridgeInfos.name, bridgeInfos.addr);
    }

    if (network == "eth") {
        const bridgeDeployed = await Bridge.deployed();

        const bridgeInfos = {
            name: 'BSC',
            addr: '0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE'
        };
        await bridgeDeployed.addOneBridge(bridgeInfos.name, bridgeInfos.addr);
    }
};