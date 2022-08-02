// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("loginViaBackend", (email, password) =>{
    cy.request(
        'POST',
        'https://gallery-api.vivifyideas.com/api/auth/login',
        {
            email: email,
            password:password
        }
    ).its("body").then((response)=>{
        window.localStorage.setItem("token", response.access_token);
    })
})

Cypress.Commands.add('createGalleryViaBackend', (title, description, imageUrl) => {
    cy.request(
        {
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/galleries',
        body: {
            title: title,
            description: description,
            images: [imageUrl]
        },
        headers: {
            authorization: 'Bearer ' + window.localStorage.getItem('token')
        }
    })
})

Cypress.Commands.add('deleteGalleryViaBackend', (id)=>{
    cy.request({
        method: 'DELETE',
        url: `https://gallery-api.vivifyideas.com/api/galleries/${id}`,
        headers:{
            authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
    });
});

Cypress.Commands.add('editGalleryViaBackend', (galleryId, title, description, image) => {
    cy.request({
        method: 'PUT',
        url: `https://gallery-api.vivifyideas.com/api/galleries/${galleryId}`,
        body: {
            title: title,
            description: description,
            images: [image],
        },
        headers: {
            authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
    
    });
});

