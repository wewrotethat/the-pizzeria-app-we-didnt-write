
import { createTestPizza, deleteTestPizzas, deleteTestOrders } from "../support/utils"


describe(
    `Admin Order Tests`,
    () => {

        beforeEach(() => {
            deleteTestPizzas();
            createTestPizza();
            deleteTestOrders();
            cy.clearCookies();
            cy.visit('localhost:3000');
        })
        
        it(
            `Given an order by a user,
                When the admin logs in,
                Then the order should be shown in the admin panel`,
            () => {

                //Create order
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.get('[data-cy="checkout-button"]').click()
                cy.contains('CASH ON DELIVERY').should('exist')
                cy.contains('CASH ON DELIVERY').click()
                cy.get('[data-cy="order-detail-name"]').type('llalal lalala')
                cy.get('[data-cy="order-detail-address"]').type('+251 987654311')
                cy.get('[data-cy="order-detail-phone"]').type('gambia st.')
                cy.get('[data-cy="order-detail-submit"]').click()

                //Login as admin
                cy.clearCookies()
                cy.visit('localhost:3000/admin/login')
                cy.get('[data-cy=username]').type('admin')
                cy.get('[data-cy=password]').type('123456')
                cy.get('[data-cy=sign-in-button]').click()

                //Check order
                cy.get('[data-cy="llalal lalala\'s-order"]').should('exist')
            })

        it(
            `Given an order by a user,
                When the admin logs in and moves the order to the next stage twice,
                Then the final stage, delivered should be shown in the admin panel`,
            () => {

                //Create order
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.get('[data-cy="checkout-button"]').click()
                cy.contains('CASH ON DELIVERY').should('exist')
                cy.contains('CASH ON DELIVERY').click()
                cy.get('[data-cy="order-detail-name"]').type('llalal lalala')
                cy.get('[data-cy="order-detail-address"]').type('+251 987654311')
                cy.get('[data-cy="order-detail-phone"]').type('gambia st.')
                cy.get('[data-cy="order-detail-submit"]').click()

                //Login as admin
                cy.clearCookies()
                cy.visit('localhost:3000/admin/login')
                cy.get('[data-cy=username]').type('admin')
                cy.get('[data-cy=password]').type('123456')
                cy.get('[data-cy=sign-in-button]').click()

                //Check order
                cy.get('[data-cy="llalal lalala\'s-order"]').should('exist')
                cy.get('[data-cy="llalal lalala-next-stage"]').click()
                cy.wait(2000)
                cy.get('[data-cy="llalal lalala-next-stage"]').click()
                cy.wait(2000)
                cy.reload()
                cy.contains('delivered').should('exist')
            })

        it(
            `Given an order by a user,
                When the admin logs in,
                Then the order should be shown in the admin panel`,
            () => {

                //Create order
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.get('[data-cy="checkout-button"]').click()
                cy.contains('CASH ON DELIVERY').should('exist')
                cy.contains('CASH ON DELIVERY').click()
                cy.get('[data-cy="order-detail-name"]').type('llalal lalala')
                cy.get('[data-cy="order-detail-address"]').type('+251 987654311')
                cy.get('[data-cy="order-detail-phone"]').type('gambia st.')
                cy.get('[data-cy="order-detail-submit"]').click()

                //Login as admin
                cy.clearCookies()
                cy.visit('localhost:3000/admin/login')
                cy.get('[data-cy=username]').type('admin')
                cy.get('[data-cy=password]').type('123456')
                cy.get('[data-cy=sign-in-button]').click()

                //Check order
                cy.get('[data-cy="llalal lalala\'s-order"]').should('exist')
                cy.get('[data-cy="llalal lalala-next-stage"]').click()
                cy.reload()
                cy.contains('on the way').should('exist')
            })
    }
)