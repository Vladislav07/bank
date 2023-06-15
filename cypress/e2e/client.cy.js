/// <reference types="cypress" />

describe('opportunity log in to the app', () => {
 beforeEach(() => {
  cy.visit('http://localhost:9000/#/')
 })

 it('can add new todo items', () => {
  const login = 'developer'
  const password = 'skillbox'
  cy.get('.logOut__input').first().type(login)
  cy.get('.logOut__input').last().type(password)
  cy.get('.logOut__btn').click()

  cy.location().should((loc) => {
   expect(loc.hash).to.eq('#/list')
  })
 })
})
