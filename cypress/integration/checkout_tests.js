import { createTestPizza, createTestPizza2, deleteTestPizzas } from "../support/utils"

describe(
    `User Checkout Tests`,
    () => {

        beforeEach(() => {
            deleteTestPizzas();
            createTestPizza();
            cy.clearCookies();
            cy.visit('localhost:3000');
        })

        it(
            `Given a user on the detail page,
                When the user adds items to cart and taps on checkout,
                Then cash on delivery option should be shown`,
            () => {

                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.get('[data-cy="checkout-button"]').click()
                cy.contains('CASH ON DELIVERY').should('exist')
            })

        it(
            `Given a user on the detail page,
                When the user adds items to cart, taps on checkout and selects cash on delivery,
                Then they should be propmted to enter their name and address`,
            () => {

                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.get('[data-cy="checkout-button"]').click()
                cy.contains('CASH ON DELIVERY').should('exist')
                cy.contains('CASH ON DELIVERY').click()
                cy.get('[data-cy="order-detail-name"]').type('llalal lalala')
                cy.get('[data-cy="order-detail-phone"]').type('+251 987654311')
                cy.get('[data-cy="order-detail-address"]').type('gambia st.')
                cy.get('[data-cy="order-detail-submit"]').click()
                cy.get('[data-cy="order-detail-submit"]').should('not.exist')
            })

        it(
            `Given a user on the address input form,
                When the user forgets to add a non empty phone number,
                Then they should promted to enter a valid phone number`,
            () => {

                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.get('[data-cy="checkout-button"]').click()
                cy.contains('CASH ON DELIVERY').should('exist')
                cy.contains('CASH ON DELIVERY').click()
                cy.get('[data-cy="order-detail-name"]').type('llalal lalala')
                cy.get('[data-cy="order-detail-address"]').type('gambia st.')
                cy.get('[data-cy="order-detail-submit"]').click()
                cy.get('[data-cy="order-error-text"]').should('exist')
            })

        it(
            `Given a user on the address input form,
                When the user forgets to add a non empty address,
                Then they should promted to enter a valid address`,
            () => {

                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.get('[data-cy="checkout-button"]').click()
                cy.contains('CASH ON DELIVERY').should('exist')
                cy.contains('CASH ON DELIVERY').click()
                cy.get('[data-cy="order-detail-name"]').type('llalal lalala')
                cy.get('[data-cy="order-detail-phone"]').type('+251 987654311')
                cy.get('[data-cy="order-detail-submit"]').click()
                cy.get('[data-cy="order-error-text"]').should('exist')
            })

        it(
            `Given a user on who just made an order,
                    When the sees the order detail,
                    Then they should see the current status of the order`,
            () => {

                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.get('[data-cy="checkout-button"]').click()
                cy.contains('CASH ON DELIVERY').should('exist')
                cy.contains('CASH ON DELIVERY').click()
                cy.get('[data-cy="order-detail-name"]').type('llalal lalala')
                cy.get('[data-cy="order-detail-phone"]').type('+251 987654311')
                cy.get('[data-cy="order-detail-address"]').type('gambia st.')
                cy.get('[data-cy="order-detail-submit"]').click()
                cy.get('[data-cy="order-detail-submit"]').should('not.exist')
                cy.contains('On the way').should('exist')
            })


    }
)
