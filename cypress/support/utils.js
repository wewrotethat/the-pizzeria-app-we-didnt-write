import 'cypress-file-upload';

export const resetUsersDatabase = () => {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/users',
    })
}

export const deleteTestPizzas = () => {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/products?title=Cypress-Test-Pizza',
    })
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:3000/api/products?title=Cypress-Test-Pizza-2',
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
            extraOptions: [
                {
                    text: 'Extra Cheese',
                    price: 1
                },]
        },
    })
}
export const createTestPizza2 = () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/products',
        body: {
            title: 'Cypress-Test-Pizza-2',
            desc: 'Cypress Test Pizza-2',
            prices: [20, 200, 2000],
            img: 'https://res.cloudinary.com/yabsra/image/upload/v1654013952/cld-sample-4.jpg',
            extraOptions: [
                {
                    text: 'Extra Cheese',
                    price: 1
                },]
        },
    })
}
