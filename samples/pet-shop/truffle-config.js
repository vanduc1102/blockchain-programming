require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const { MNEMONIC, ROPSTEN_ETH_NODE_URL } = process.env

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    mainnet: {
      host: '127.0.0.1',
      port: 8545,
      network_id: 1
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: MNEMONIC
          },
          providerOrUrl: ROPSTEN_ETH_NODE_URL,
          addressIndex: 0,
          numberOfAddresses: 1,
          shareNonce: true,
          derivationPath: "m/44'/1'/0'/0/"
        }),
      network_id: '3',
      pollingInterval: 10_000,
      networkCheckTimeout: 1_000_000
    },
    bscTestnet: {
      provider: () => new HDWalletProvider(MNEMONIC, 'wss://data-seed-prebsc-1-s1.binance.org:8545'),
      addressIndex: 0,
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      networkCheckTimeout: 1_000_000,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: '^0.8.0'
    }
  }
}
