import { resetUsersDatabase } from '../support/utils'

beforeEach(() => {
    cy.clearCookies()
    resetUsersDatabase()
    cy.visit('localhost:3000/admin/login')
    cy.get('[data-cy=username]').type('admin')
    cy.get('[data-cy=password]').type('123456')
    cy.get('[data-cy=sign-in-button]').click()
    cy.visit('localhost:3000/admin/users')
    cy.get('[data-cy=add-user-button]').click()
})


describe(
    `Admin Create User Tests`,
    () => {
        it(`Given a logged in admin and valid name, email, username and password,
        When an admin tries to create a new user with them,
        Then the user should be shown on the user list`, () => {

            cy.intercept('POST', 'http://localhost:3000/api/users').as('postUser')

            cy.get('[data-cy=sign-up-name]').type('Cypress Admin')
            cy.get('[data-cy=sign-up-username]').type('cypress-admin')
            cy.get('[data-cy=sign-up-email]').type('cypress@admin.com')
            cy.get('[data-cy=sign-up-password]').type('12345678')
            cy.get('[data-cy=sign-up-button]').click()
            cy.wait('@postUser')
            cy.get('table').contains('td', 'Cypress Admin').should('exist');

        })

        it(`Given a logged in admin and no name, email, username and password,
        When an admin tries to create a new user with them,
        Then an error message should be shown`, () => {
            cy.get('[data-cy=sign-up-button]').click()
            cy.get('[data-cy=sign-up-error]').should('exist');

        }
        )

        it(`Given a logged in admin and valid name, email, username and a 6 character password,
        When an admin tries to create a new user with them,
        Then an error message should be shown stating that password should at least have 8 characters`, () => {

            cy.get('[data-cy=sign-up-name]').type('Cypress Admin')
            cy.get('[data-cy=sign-up-username]').type('cypress-admin')
            cy.get('[data-cy=sign-up-email]').type('cypress@admin.com');
            cy.get('[data-cy=sign-up-password]').type('123456');
            cy.get('[data-cy=sign-up-button]').click()
            cy.get('[data-cy=sign-up-error]').should('exist').and('contain', '8 characters');

        })

        it(`Given a logged in admin and valid name, email, username and a 19 character password,
        When an admin tries to create a new user with them,
        Then an error message should be shown stating that password can have at most 16 characters`, () => {

            cy.get('[data-cy=sign-up-name]').type('Cypress Admin')
            cy.get('[data-cy=sign-up-username]').type('cypress-admin')
            cy.get('[data-cy=sign-up-email]').type('cypress@admin.com');
            cy.get('[data-cy=sign-up-password]').type('1234567891011121314');
            cy.get('[data-cy=sign-up-button]').click()
            cy.get('[data-cy=sign-up-error]').should('exist').and('contain', '16 characters');

        })
    }
)