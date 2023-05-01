# CheckDot.EVMBridgeContract
## How it works

It's a EVM Bridge Contract for bridging CDT or any token between two blockchains.
This contract need an API for hook any deposits and make transfers on destination blockchain.

## How to run
Clone and initialize the repository:
```sh
$ git clone https://github.com/checkdot/CheckDot.EVMBridgeContract.git
$ cd CheckDot.EVMBridgeContract
$ npm i
```
Compile the project:
```sh
$ truffle compile
```

### Local Deployment
And deploy locally
```sh
$ truffle deploy
```
```sh
$ truffle deploy --network development
```

## How to test
```sh
$ truffle compile && truffle test --network development
```

## Contributors
Jeremy Guyet

## License
MIT