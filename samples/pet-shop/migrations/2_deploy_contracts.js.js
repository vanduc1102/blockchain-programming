const Adoption = artifacts.require('Adoption.sol')

module.exports = async function (deployer) {
  await deployer.deploy(Adoption)
}
