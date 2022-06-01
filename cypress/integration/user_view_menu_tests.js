import { createTestPizza, deleteTestPizza } from "../support/utils"

beforeEach(() => {
    deleteTestPizza();
    createTestPizza();
    cy.clearCookies()
    // cy.intercept('/api/products', (req) => {
    //     req.reply({
    //         statusCode: 200, // default
    //         fixture: 'dummy_menu_of_1.json'
    //     })
    // })
    cy.visit('localhost:3000')

})

describe(
    `User Menu Tests`,
    () => {
        it(`Given a user on the homepage
        When the user scrolls down
        Then they should see the menu of pizzas with the right prices`,
            () => {

                cy.scrollTo('bottom')
                cy.contains('Cypress-Test-Pizza').should('exist')
                cy.contains('Cypress Test Pizza').should('exist')
                cy.contains('$10').should('exist')

            })

        it(`Given a user on the homepage
        When the user scrolls down
        Then they should see the menu of pizzas with the right image`,
            () => {

                cy.scrollTo('bottom')
                cy.contains('Cypress-Test-Pizza').should('exist')
                cy.contains('Cypress Test Pizza').should('exist')
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').should('have.attr', 'src', 'https://res.cloudinary.com/yabsra/image/upload/v1654013952/cld-sample-4.jpg').should('exist')
                cy.contains('$10').should('exist')

            })

        it(`Given a user on the homepage,
            When the user scrolls down,
            Then they should see the menu of pizzas`,
            () => {

                cy.scrollTo('bottom')
                cy.get('[data-cy="pizza-list"]').should('exist')


            })
    })