import { createTestPizza, createTestPizza2, deleteTestPizzas } from "../support/utils"


describe(
    `User Order Tests`,
    () => {

        beforeEach(() => {
            deleteTestPizzas();
            createTestPizza();
            cy.clearCookies();
            cy.visit('localhost:3000');
        })
        it(
            `Given a user on the home page,
            When the user clicks on an item in the menu,
            Then they should be redirected to the detail page`,
            () => {
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.url().should('include', '/product')
            }
        )

        it(
            `Given a user on the detail page,
            When the user clicks on the add to cart button with the desired amount, size and extras,
            Then the number of item types in the cart should increase by 1`,
            () => {
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="large-size-selector"]').click()
                cy.get('[data-cy="Extra Cheese-extra-option-checkbox"]').click()
                cy.get('[data-cy="quantity-input"]').clear().type(69)
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').should('have.text', '1')
            })

        it(
            `Given a user on the detail page,
            When the user clicks on the add to cart button without changing the amount, size or extras,
            Then the number of item types in the cart should increase by 1`,

            () => {
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').should('have.text', '1')
            })

        it(
            `Given a user on the detail page,
            When they tap up arrow key,
            Then the quentity value should increase by 1`,

            () => {
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="quantity-input"]').type('{uparrow}')
                cy.get('[data-cy="quantity-input"]').should('have.value', '2')

            })

        it(
            `Given a user on the detail page,
            When they tap down arrow key,
            Then the quentity value should decrease by 1`,

            () => {
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="quantity-input"]').type('{downarrow}')
                cy.get('[data-cy="quantity-input"]').should('have.value', '0')

            })

        it(
            `Given a user on the detail page,
                When a user adds an item to their cart,
                Then the cart have the added item`,
            () => {
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.contains('Cypress-Test-Pizza').should('exist')
                cy.url().should('include', '/cart')
                cy.get('[data-cy="cart-image-Cypress-Test-Pizza"]').should('have.attr', 'src', 'https://res.cloudinary.com/yabsra/image/upload/v1654013952/cld-sample-4.jpg').should('exist')

            })


        it(
            `Given a user on the detail page,
                When the user clicks on the add to cart button with the size,
                Then the size should be added to the cart which is reflected by the price`,
            () => {
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="large-size-selector"]').click()
                cy.get('[data-cy="quantity-input"]').clear().type(1)
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.contains('$1000').should('exist')
            })

        it(
            `Given a user on the detail page,
                When the user clicks on the add to cart button with the desired extras,
                Then the extras should be added to the cart which is shown in the cart`,
            () => {
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="large-size-selector"]').click()
                cy.get('[data-cy="Extra Cheese-extra-option-checkbox"]').click()
                cy.get('[data-cy="quantity-input"]').clear().type(69)
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.contains('Extra Cheese').should('exist')
            })

        it(
            `Given a user on the detail page,
                When the user adds multiple items to the cart,
                Then all of them should be shown`,
            () => {

                createTestPizza2();
                cy.get('[data-cy="image-Cypress-Test-Pizza"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.go('back')
                cy.get('[data-cy="image-Cypress-Test-Pizza-2"]').click()
                cy.get('[data-cy="add-to-cart-button"]').click()
                cy.get('[data-cy="cart-counter"]').click()
                cy.contains('Cypress-Test-Pizza').should('exist')
                cy.contains('Cypress-Test-Pizza-2').should('exist')
            })


    }
)
