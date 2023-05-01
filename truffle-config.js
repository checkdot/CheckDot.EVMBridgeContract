const HDWalletProvider = require('@truffle/hdwallet-provider');
var secret = require("./secret");

module.exports = {
  plugins: ['solidity-coverage', 'truffle-plugin-verify'],
  api_keys: {
    bscscan: secret.API_KEY,
    etherscan: secret.ETHER_SCAN_API_KEY,
    arbiscan: secret.ARBI_SCAN_API_KEY
  },
  networks: {
    development: {
      // truffle deploy --network development
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    testnet: { // truffle deploy --network testnet
      provider: () => new HDWalletProvider(secret.MMENOMIC, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: { // truffle deploy --network bsc
      provider: () => new HDWalletProvider(secret.MMENOMIC, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    eth: {
      // https://infura.io/dashboard/ethereum
      // truffle deploy --network eth
      provider: () => new HDWalletProvider(secret.MMENOMIC, `https://mainnet.infura.io/v3/${secret.INFURA_API_KEY}`),
      network_id: 1,      // Mainnet id
      gas: 5500000
    },
    arb: {
      // truffle deploy --network arb
      provider: () => new HDWalletProvider(secret.MMENOMIC, `https://arb1.arbitrum.io/rpc`),
      network_id: 42161,      // Mainnet id
    },
    glq: {
      // https://infura.io/dashboard/ethereum
      // truffle deploy --network eth
      provider: () => new HDWalletProvider(secret.MMENOMIC, `http://34.122.85.128:8545`),
      network_id: 614,      // Mainnet id
      gas: 5500000
    },
    polygon: {
      // truffle deploy --network polygon
      provider: () => new HDWalletProvider(secret.MMENOMIC, `https://rpc-mainnet.maticvigil.com`),
      network_id: 137,      // Mainnet id
      gas: 180e9,
      gasPrice: 18000000,
      gasLimit: 29795532000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.9"
    }
  }
};
