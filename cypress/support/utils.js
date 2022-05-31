/**
 * Clears the database
 */
export const resetUsersDatabase = () => {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/users',
    })
}

export const deleteTestPizza = () => {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/products?title=Cypress-Test-Pizza',
    })
}
export const createTestPizza = () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/products',
        body: {
            title: 'Cypress-Test-Pizza',
            desc: 'Cypress Test Pizza',
            prices: [10, 100, 1000],
            img: 'https://res.cloudinary.com/yabsra/image/upload/v1654013952/cld-sample-4.jpg',
        },
    })
}