const Bridge = artifacts.require('EVMBridge');

module.exports = async function (deployer, network, accounts) {
    if (network == "development") return ;

    if (network == "bsc") {
        const bridgeDeployed = await Bridge.deployed();
        
        await bridgeDeployed.depositETH(web3.utils.toWei("0.01"), { from: accounts[0], value: web3.utils.toWei("0.01") });
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