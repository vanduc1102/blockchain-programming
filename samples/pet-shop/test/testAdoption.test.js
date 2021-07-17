const Adoption = artifacts.require('Adoption')

contract('Adoption contract with JS', async (accounts) => {
  let adoption
  let expectedAdopter

  beforeEach(async () => {
    adoption = await Adoption.deployed()
    await adoption.adopt(8, { from: accounts[0] })
    expectedAdopter = accounts[0]
  })

  it('can fetch the address of an owner by pet id', async () => {
    const adopter = await adoption.adopters(8)
    assert.equal(adopter, expectedAdopter, 'The owner of the adopted.')
  })

  it('can fetch the collection  of all pet owner\'s addresses', async () => {
    const adopters = await adoption.getAdopters()
    assert.equal(adopters[8], expectedAdopter, 'The owner of the adopter')
  })
})
