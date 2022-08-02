///<reference types="Cypress" />


import {loginPage} from './../page_objects/loginPage';
import { createGalleryPage } from '../page_objects/createGalleryPage';
import { deleteGallery } from '../page_objects/deleteGallery';

describe('POM delete gallery', ()=> {
    beforeEach('log into the app and create a gallery', () => {
        cy.loginViaBackend("srdjan.mutlak@gmail.com", "12345678");
        cy.visit('/create');
        loginPage.logoutButton.should('be.visible');
        cy.intercept(
            'GET',
            'https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term='
        ).as('myGalleriesPage');
    });
    

    //it("delete gallery via frontend (BUG-it's not working because delete gallery button don't exist)", ()=>{
        //cy.wait('@submitGallery').then((interception)=>{
            //expect(interception.response.statusCode).eq(201);
        //})
        //deleteGallery.deleteGallery();
        //cy.url().should('contains', 'https://gallery-app.vivifyideas.com/');
        //deleteGallery.h1.should('have.text', "All Galleries");
    //});

    //it('create gallery via backend', () => {
        //cy.createGalleryViaBackend("Sunflowers", "beautiful sunflowers field", "http://static1.everypixel.com/ep-libreshot/0242/0259/3015/99837/2420259301599837355.jpg").then((response)=>{
        //let galleryId = response.body.id;
        //cy.writeFile('cypress/fixtures/testId.json', galleryId.toString());
        //}); 
        //createGalleryPage.myGalleriesButton.click();
        //cy.wait('@myGalleriesPage').then((interception)=>{
           // cy.readFile('cypress/fixtures/testId.json').then((file)=>{
              //  let id=file;
              //  expect(interception.response.body.galleries[0].id).eq(id);
           // });
      //  })
   // });
   it('create gallery via backend', () => {
    cy.createGalleryViaBackend("Sunflowers", "beautiful sunflowers field", "http://static1.everypixel.com/ep-libreshot/0242/0259/3015/99837/2420259301599837355.jpg").then((response)=>{
    let galleryId = response.body.id;
    cy.writeFile('cypress/fixtures/testId.json', galleryId.toString());
    }); 
    createGalleryPage.myGalleriesButton.click();
    cy.wait('@myGalleriesPage').then((interception)=>{
        cy.readFile('cypress/fixtures/testId.json').then((file)=>{
            let id=file;
            expect(interception.response.body.galleries[0].id).eq(id);
        });
    })
    
})

    it('delete gallery via backend (ATTENTION- the gallery must be created first in order for this to work!)', ()=>{
            cy.readFile('cypress/fixtures/testId.json').then((file)=>{
                let id=file;
                cy.deleteGalleryViaBackend(id);
            });
            createGalleryPage.myGalleriesButton.click();
            cy.wait('@myGalleriesPage').then((interception)=>{
            cy.readFile('cypress/fixtures/testId.json').then((file)=>{
            let id=file;
            expect(interception.response.body.galleries[0].id).to.not.eq(id);
        });
        })
    })
});
