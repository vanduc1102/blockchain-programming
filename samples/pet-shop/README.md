# Pet Shop

This is implementation of the tutorial here: https://www.trufflesuite.com/tutorial with some small modifications.


## Deploy to Kovan Testnet

- Asking for ETH on Kovan: https://github.com/kovan-testnet/faucet  or https://faucet.metamask.io/

### Use [Go Ethereum](https://geth.ethereum.org/)

1. Start GoEthereum with this command: `geth --ropsten --rpc --rpcapi eth,net,web3,personal`
and watch the console for:
```
INFO [07-25|18:44:31.621] IPC endpoint opened                      url=/Users/duc.nguyen/Library/Ethereum/ropsten/geth.ipc
INFO [07-25|18:44:31.621] HTTP server started                      endpoint=127.0.0.1:8545 prefix= cors= vhosts=localhost
```
1. Open a new console and connect with the IPC above.

`geth attach /Users/duc.nguyen/Library/Ethereum/ropsten/geth.ipc`

you are now in [Interactive Console](https://geth.ethereum.org/docs/interface/javascript-console) mode, within the mode, you can try these commands:

- type `eth.syncing` to check the sync status. please wait until the result is `false`.
- type `eth.accounts` to list all account.

1. Open new console to add an existing account from Ganache.

