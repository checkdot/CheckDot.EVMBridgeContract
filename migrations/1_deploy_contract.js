const Bridge = artifacts.require('EVMBridge');

module.exports = async function (deployer, network, accounts) {
    if (network == "development") return ;

    if (network == "bsc") {
        const chain = "BSC";
        await deployer.deploy(
            Bridge,
            chain,
            '0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE',
            '10000000000000000000', // 10 USD cost BRIDGE BSC to ETH
            '0', // transfer fees
            '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // in (WBNB)
            '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // out (BUSD)
            '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16' // pool
        );
    }

    if (network == "eth") {
        const chain = "ETH";
        const dex = {
            in: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // in (WETH)
            out: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // out (DAI) Important Only 18 decimals!
            pool: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11' // DAI/WETH uniswap v2 Pair
        };
        await deployer.deploy(
            Bridge,
            chain,
            '0xCdB37A4fBC2Da5b78aA4E41a432792f9533e85Cc',
            '10000000000000000000', // 10 USD cost BRIDGE ETH to BSC
            '0', // transfer fees
            dex.in, // in (WETH)
            dex.out, // out (BUSD)
            dex.pool // pool
            );
    }

    if (network == "arb") {
        const chain = "ARB";
        const dex = {
            in: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', // in (WETH)
            out: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // out (DAI) Important Only 18 decimals!
            pool: '0xa961f0473da4864c5ed28e00fcc53a3aab056c1b' // DAI/WETH uniswap v2 Pair
        };
        await deployer.deploy(
            Bridge,
            chain,
            '0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE',
            '10000000000000000000', // 10 USD cost BRIDGE ETH to BSC
            '0', // transfer fees
            dex.in, // in (WETH)
            dex.out, // out (BUSD)
            dex.pool // pool
        );
    }

    if (network == "polygon") {
        const chain = "MATIC";
        const dex = {
            in: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // in (WMATIC)
            out: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // out (DAI) Important Only 18 decimals!
            pool: '0x6BaEad5Db7FeE6D5c9F0Ca07Bb5038C4cD279F5c' // DAI/WMATIC uniswap v2 Pair
        };
        await deployer.deploy(
            Bridge,
            chain,
            '0x26c80854c36ff62bba7414a358c8c23bbb8dec39',
            '10000000000000000000', // 10 USD cost BRIDGE ETH to BSC
            '0', // transfer fees
            dex.in, // in (WETH)
            dex.out, // out (BUSD)
            dex.pool // pool
        );
    }
};