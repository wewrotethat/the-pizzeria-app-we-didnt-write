beforeEach(() => {
    cy.clearCookies()
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
        When an admin vists /admin route and clicks on a product,
        Then they should be able to see the product details`, () => {
            cy.contains('Products').should('exist')
            cy.contains('Id').should('exist')
            cy.contains('Image').should('exist')
            cy.contains('Title').should('exist')
            cy.contains('Action').should('exist')
        })


    })

