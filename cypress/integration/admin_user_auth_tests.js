beforeEach(() => {
    cy.clearCookies()
    cy.visit('localhost:3000/admin')
})

describe(
    `Admin User Authentication Tests`,
    () => {
        it(`Given wrong username and password,
        When a user tries to log in with them,
        Then they should be shown an error message`, () => {

            cy.get('[data-cy=username]').type('abcd&')
            cy.get('[data-cy=password]').type('123456')
            cy.get('[data-cy=sign-in-button]').click()
            cy.get('[data-cy=sign-in-error]').should('contain', 'Wrong Credentials!')

        })

        it(`Given a correct username and a wrong password,
        When a user tries to log in with them,
        Then they should be shown an error message`, () => {

            cy.get('[data-cy=username]').type('admin')
            cy.get('[data-cy=password]').type('jjjjjj')
            cy.get('[data-cy=sign-in-button]').click()
            cy.get('[data-cy=sign-in-error]').should('contain', 'Wrong Credentials!')

        })

        it(`Given an incorrect username and a correct password,
            When a user tries to log in with them,
            Then they should be shown an error message`, () => {

            cy.get('[data-cy=username]').type('admin&')
            cy.get('[data-cy=password]').type('123456')
            cy.get('[data-cy=sign-in-button]').click()
            cy.get('[data-cy=sign-in-error]').should('contain', 'Wrong Credentials!')

        })

        it(`Given a correct username and a correct password,
        When a user tries to log in with them,
        Then they should be redirected to the admin page`, () => {

            cy.get('[data-cy=username]').type('admin')
            cy.get('[data-cy=password]').type('123456')
            cy.get('[data-cy=sign-in-button]').click()
            cy.contains('Orders').should('exist')

        })

    }
)


