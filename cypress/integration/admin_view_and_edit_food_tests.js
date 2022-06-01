import { createTestPizza, deleteTestPizza } from "../support/utils"
import 'cypress-file-upload';

beforeEach(() => {
    cy.clearCookies()
    deleteTestPizza()
    cy.visit('localhost:3000/admin/login')
    cy.get('[data-cy=username]').type('admin')
    cy.get('[data-cy=password]').type('123456')
    cy.get('[data-cy=sign-in-button]').click()
})

describe(
    `Admin and Product Tests`,
    () => {
        it(`Given a logged in admin and products existing on the system,
        When an admin vists /admin route,
        Then they should be able to see the products`, () => {
            cy.contains('Products').should('exist')
            cy.contains('Id').should('exist')
            cy.contains('Image').should('exist')
            cy.contains('Title').should('exist')
            cy.contains('Action').should('exist')
        })

        it(`Given a logged in admin and products existing on the system,
        When an admin vists /admin route and clicks on edit on a product,
        Then they should be able to see the product details`, () => {

            cy.get('.edit-button').first().click()
            cy.contains('Edit Product').should('exist')
        })

        it(`Given a logged in admin and products existing on the system,
        When an admin vists /admin route and clicks on edit on a product,
        Then they should be able to see the product details`, () => {

            cy.get('.edit-button').first().click()
            cy.contains('Edit Product').should('exist')
        })

        it(`Given a logged in admin and products existing on the system,
        When an admin vists /admin route and clicks on edit on a product and updates the product,
        Then they should be able to see the updated price`, () => {

            cy.intercept('PUT', '/api/products/*').as('editPizza')

            cy.get('.edit-button').first().click()
            cy.contains('Edit Product').should('exist')
            cy.get('[data-cy="small-pizza-price-field"]').clear().type(123.45)
            cy.get('[data-cy="submit-product-detail-button"]').click()
            cy.wait('@editPizza')
            cy.contains('$123.45').should('exist')
        })

        it(`Given a logged in admin,
        When an admin creates a product and tries to delete it,
        Then the product should not be shown on the products list`, { defaultCommandTimeout: 15000 }, () => {

            cy.get('[data-cy="add-product-button"]').click()

            const fixtureFile = 'pizza.png';
            cy.get('[data-cy="file-input"]').attachFile(fixtureFile);
            cy.get('[data-cy="title-field"]').type('Cypress-Test-Pizza')
            cy.get('[data-cy="desc-field"]').type('Cypress Test Pizza')
            cy.get('[data-cy="small-pizza-price-field"]').type(10)
            cy.get('[data-cy="medium-pizza-price-field"]').type(100)
            cy.get('[data-cy="large-pizza-price-field"]').type(1000)
            cy.get('[data-cy="submit-product-detail-button"]').click()
            cy.contains('Cypress-Test-Pizza').should('exist')
            cy.scrollTo('bottom')

            cy.get('.delete-button').last().click()
            cy.contains('Cypress-Test-Pizza').should('not.exist')

        })

        it(`Given a logged in admin,
        When an admin tries to create a product and with empty fields,
        Then an error message should be shown`, { defaultCommandTimeout: 15000 }, () => {

            cy.get('[data-cy="add-product-button"]').click()
            cy.get('[data-cy="submit-product-detail-button"]').click()
            cy.get('[data-cy="product-error-field"]').should('exist')

        })
    })
