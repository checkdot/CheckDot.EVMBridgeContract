const TestBridge = artifacts.require('TestBridge');

module.exports = async function (deployer, network, accounts) {
    if (network == "development") return ;

    if (network == "glq") {

        const bridgeDeployed = await TestBridge.deployed();

        let balance = web3.utils.fromWei((await bridgeDeployed.balance()).toString());

        console.log(balance);

        if (balance > 1) {
            await bridgeDeployed.withdrawBridged();

            let balance = web3.utils.fromWei((await bridgeDeployed.balance()).toString());

            console.log(balance);
        }
        

        // await deployer.deploy(TestBridge);//0x8De1c22B8EB66b9d1Cc6295CA43Cb654305a3188
    }
};