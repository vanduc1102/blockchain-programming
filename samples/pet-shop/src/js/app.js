/* global TruffleContract, $, Web3 */

const ETH_GENESIS_ADDRESS = '0x0000000000000000000000000000000000000000'

const App = {
  web3Provider: null,
  web3: null,
  contracts: {},

  init: async function () {
    // Load pets.
    $.getJSON('../pets.json', function (data) {
      const petsRow = $('#petsRow')
      const petTemplate = $('#petTemplate')

      for (let i = 0; i < data.length; i++) {
        petTemplate.find('.panel-title').text(data[i].name)
        petTemplate.find('img').attr('src', data[i].picture)
        petTemplate.find('.pet-breed').text(data[i].breed)
        petTemplate.find('.pet-age').text(data[i].age)
        petTemplate.find('.pet-location').text(data[i].location)
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id)

        petsRow.append(petTemplate.html())
      }
    })

    return await App.initWeb3()
  },

  initWeb3: async function () {
    if (window.ethereum) {
      App.web3Provider = window.ethereum
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
      } catch (error) {
        console.error('User denied account access!', error)
      }
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }
    App.web3 = new Web3(App.web3Provider)
    return App.initContract()
  },

  initContract: function () {
    $.getJSON('Adoption.json', function (data) {
      const AdoptionArtifact = data
      App.contracts.Adoption = TruffleContract(AdoptionArtifact)
      App.contracts.Adoption.setProvider(App.web3Provider)
      return App.markAdopted()
    })

    return App.bindEvents()
  },

  bindEvents: function () {
    $(document).on('click', '.btn-adopt', App.handleAdopt)
  },

  markAdopted: function () {
    let adoptionInstance
    App.contracts.Adoption.deployed().then(function (instance) {
      adoptionInstance = instance
      return adoptionInstance.getAdopters.call()
    }).then(adopters => {
      for (let i = 0; i < adopters.length; i++) {
        if (adopters[i] !== ETH_GENESIS_ADDRESS) {
          $('.panel-pet')
            .eq(i)
            .find('button')
            .removeClass('btn-primary')
            .addClass('btn-success')
            .text('Success')
            .attr('disabled', true)
        }
      }
    }).catch(err => {
      console.log(err.message)
    })
  },

  handleAdopt: function (event) {
    event.preventDefault()
    let adoptionInstance
    const petId = parseInt($(event.target).data('id'))

    App.web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error)
        return
      }
      const account = accounts[0]
      App.contracts.Adoption.deployed().then(function (instance) {
        adoptionInstance = instance
        return adoptionInstance.adopt(petId, { from: account })
      }).then(function (result) {
        return App.markAdopted()
      }).catch(function (error) {
        console.log('Cant adopt: ', error)
      })
    })
  }

}

$(function () {
  $(window).load(function () {
    App.init()
  })
})
