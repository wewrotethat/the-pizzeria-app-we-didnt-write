/**
 * Sets the database to the empty list of todos
 */
export const resetUsersDatabase = () => {
    console.log('resetDatabase')
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/users',
    })
}