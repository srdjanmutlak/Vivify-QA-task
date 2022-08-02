///<reference types="Cypress" />


import {loginPage} from './../page_objects/loginPage';
import { createGalleryPage } from '../page_objects/createGalleryPage';
const faker = require('faker');
const randomstring = require("randomstring");

let galleryData = {
    randomTitle:faker.name.title(),
    randomDescription:faker.lorem.sentence(),
    randomUrlJpg:faker.internet.url() + ".jpg",
    randomUrlPng:faker.internet.url() + ".png",
    randomUrlJpeg: faker.internet.url() + ".jpeg",
    randomUrlTift:faker.internet.url() + ".tift",
    randomUrlGif: faker.internet.url() + ".gif",
}
let shortTitle= randomstring.generate(1);
let longTitle= randomstring.generate(256);
let longDescription= randomstring.generate(1001);

describe('edit gallery tests', ()=> {
    beforeEach('log into the app and create a gallery', () => {
        cy.loginViaBackend("srdjan.mutlak@gmail.com", "12345678");
        cy.visit('/create');
        loginPage.logoutButton.should('be.visible');

        cy.intercept(
            'GET',
            'https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term='
        ).as('myGalleriesPage');
    });

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

    it('edit gallery - change title to contain less than minimum of 2 characters', ()=>{
        cy.readFile('cypress/fixtures/testId.json').then((file)=>{
            let galleryId=file;
            cy.editGalleryViaBackend(galleryId, shortTitle, galleryData.randomDescription, galleryData.randomUrlJpeg).then((response)=>{
                expect(response.status).eq(422);
            });
        });   
    });

    it('edit gallery - change title to contain more than maximum of 255 characters', ()=>{
        cy.readFile('cypress/fixtures/testId.json').then((file)=>{
            let galleryId=file;
            cy.editGalleryViaBackend(galleryId, longTitle, galleryData.randomDescription, galleryData.randomUrlJpeg).then((response)=>{
                expect(response.status).eq(500);
            });
        });   
    });

    it('edit gallery - change description to contain more than maximum of 1000 characters', ()=>{
        cy.readFile('cypress/fixtures/testId.json').then((file)=>{
            let galleryId=file;
            cy.editGalleryViaBackend(galleryId, galleryData.randomTitle, longDescription, galleryData.randomUrlJpeg).then((response)=>{
                expect(response.status).eq(422);
            });
        });   
    });

    it('edit gallery - change url into invalid format .tift', ()=>{
        cy.readFile('cypress/fixtures/testId.json').then((file)=>{
            let galleryId=file;
            cy.editGalleryViaBackend(galleryId, galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlTift).then((response)=>{
                expect(response.status).eq(422);
            });
        });   
    });

    it('edit gallery - add one more url, but invalid format .gif', ()=>{
        cy.readFile('cypress/fixtures/testId.json').then((file)=>{
            let galleryId=file;
            cy.editGalleryViaBackend(galleryId, galleryData.randomTitle, galleryData.randomDescription, [galleryData.randomUrlJpeg, galleryData.randomUrlGif]).then((response)=>{
                expect(response.status).eq(422);
            });
        });   
    });

    it('edit gallery - put valid data in all fields', ()=>{
        cy.readFile('cypress/fixtures/testId.json').then((file)=>{
            let galleryId=file;
            cy.editGalleryViaBackend(galleryId, galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlJpeg).then((response)=>{
                expect(response.status).eq(200);
            });
        });  
    });

    it('edit gallery - add one more url, valid format .png', ()=>{
        cy.readFile('cypress/fixtures/testId.json').then((file)=>{
            let galleryId=file;
            cy.editGalleryViaBackend(galleryId, galleryData.randomTitle, galleryData.randomDescription, [galleryData.randomUrlJpeg, galleryData.randomUrlPng]).then((response)=>{
                expect(response.status).eq(200);
            });
        });   
    });

    it('edit gallery - delete existing description', ()=>{
        cy.readFile('cypress/fixtures/testId.json').then((file)=>{
            let galleryId=file;
            cy.editGalleryViaBackend(galleryId, galleryData.randomTitle, "", [galleryData.randomUrlJpeg, galleryData.randomUrlPng]).then((response)=>{
                expect(response.status).eq(200);
            });
        });   
    });
});


