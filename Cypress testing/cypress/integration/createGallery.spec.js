///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
import {createGalleryPage} from './../page_objects/createGalleryPage';
import { allGalleries } from '../page_objects/allGalleries';
const faker = require('faker');
const randomstring = require("randomstring");

describe('POM create gallery', ()=> {
    beforeEach('log into the app', () => {
        cy.loginViaBackend("srdjan.mutlak@gmail.com", "12345678");
        cy.visit('/create');
        loginPage.logoutButton.should('be.visible');
        createGalleryPage.createGalleryButton.click();

        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/galleries",
            ()=>{}
        ).as("submitGallery");
        cy.intercept(
            'GET',
            'https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term='
        ).as('myGalleriesPage');
    });
    let galleryData = {
        randomTitle:faker.name.title(),
        randomDescription:faker.lorem.sentence(),
        randomUrlJpg:faker.internet.url() + ".jpg",
        randomUrlPng:faker.internet.url() + ".png",
        randomUrlJpeg: faker.internet.url() + ".jpeg",
        randomUrlTift:faker.internet.url() + ".tift",
        randomUrlGif: faker.internet.url() + ".gif",
        randomUrlHtml: faker.internet.url() + ".html",
        randomUrlJs: faker.internet.url() + ".js",
        randomUrlEps: faker.internet.url() + ".eps"
    }
    let shortTitle= randomstring.generate(1);
    let longTitle= randomstring.generate(256);
    let longDescription= randomstring.generate(1001);
    let minTitle=randomstring.generate(2);
    let maxTitle=randomstring.generate(255);
    let maxDescription=randomstring.generate(1000);

    it("user able to see create gallery option",()=>{
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.h1Title.should('have.text', 'Create Gallery');
    });

    it("all elements visible on create gallery page",()=>{
        createGalleryPage.getInputField('title').should('be.visible');
        createGalleryPage.getInputField('description').should('be.visible');
        createGalleryPage.image.eq(0).should('be.visible');
        createGalleryPage.getImageButton('Add image').should('be.visible');
        createGalleryPage.buttonArrow.eq(0).should('be.visible');
        createGalleryPage.buttonArrow.eq(1).should('be.visible');
        createGalleryPage.getImageButton('Submit').should('be.visible');
        createGalleryPage.getImageButton('Cancel').should('be.visible');
    });

    it("click submit button without entering title, description and image",()=>{
        createGalleryPage.getImageButton('Submit').click();
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
    });

    it("title contains 1 character, and min for title should be 2 characters", ()=>{
        createGalleryPage.createGallery(shortTitle, galleryData.randomDescription, galleryData.randomUrlJpg);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "The title must be at least 2 characters.");
    });

    it("title contains 256 characters, and max for title should be 255 characters", ()=>{
        createGalleryPage.createGallery(longTitle, galleryData.randomDescription, galleryData.randomUrlJpg);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "The title may not be greater than 255 characters.");
    });

    it("description contains 1001 characters, and max for description should be 1000 characters", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, longDescription, galleryData.randomUrlJpg);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "The description may not be greater than 1000 characters.");
    });

    it("invalid url format for image .tift", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlTift);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
    });

    it("invalid url format for image .gif", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlGif);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
    });

    it("invalid url format for image .html", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlHtml);
        cy.wait('@submitGallery').then((interception)=> {
         expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
    });

    it("invalid url format for image .js", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlJs);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
     });

    it("invalid url format for image .eps", ()=>{
        createGalleryPage.createGallery(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlEps);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
    });

    it("title and description valid, but empty url field", ()=>{
        createGalleryPage.createGalleryNoUrl(galleryData.randomTitle, galleryData.randomDescription);
         cy.url().should('contains', 'https://gallery-app.vivifyideas.com/create');
    });

it("check arrow button Up", ()=>{ 
    createGalleryPage.checkButton(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlJpg, galleryData.randomUrlPng);
    createGalleryPage.buttonArrow.eq(4).click();
    createGalleryPage.image.eq(0).should('have.value', galleryData.randomUrlPng);
 });

it("check arrow button Down", ()=>{ 
    createGalleryPage.checkButton(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlJpg, galleryData.randomUrlPng);
    createGalleryPage.buttonArrow.eq(2).click();
    createGalleryPage.image.eq(0).should('have.value', galleryData.randomUrlPng);
 });

    it("user enters 2 urls, first valid url format, second invalid url format", ()=>{
        createGalleryPage.createGalleryTwoUrls(galleryData.randomTitle, galleryData.randomDescription, galleryData.randomUrlTift, galleryData.randomUrlJpg);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        })
        createGalleryPage.errorMessage.should('be.visible').and('contain', "Wrong format of image");
    });

    it("title 2 characters, all valid fields", ()=>{
        createGalleryPage.createGalleryNew(minTitle, galleryData.randomDescription, [galleryData.randomUrlPng, galleryData.randomUrlJpeg]);
        cy.wait('@submitGallery').then((interception)=> {
            expect(interception.response.statusCode).eq(201);
        })
        cy.url().should('contain', 'https://gallery-app.vivifyideas.com/');
        createGalleryPage.titleCreatedGallery.should('have.text', ('\n          '+minTitle+'\n        '));
        allGalleries.heading.should('have.text', 'All Galleries');
    });

it("title 255 characters, all valid fields", ()=>{
    createGalleryPage.createGallery(maxTitle, galleryData.randomDescription, galleryData.randomUrlPng);
    cy.wait('@submitGallery').then((interception)=> {
        expect(interception.response.statusCode).eq(201);
    })
    cy.url().should('contain', 'https://gallery-app.vivifyideas.com/');
    createGalleryPage.titleCreatedGallery.should('have.text', ('\n          '+maxTitle+'\n        '));
    allGalleries.heading.should('have.text', 'All Galleries');
});

it("description 1000 characters, all valid fields", ()=>{
    createGalleryPage.createGallery(galleryData.randomTitle, maxDescription, galleryData.randomUrlPng);
    cy.wait('@submitGallery').then((interception)=> {
        expect(interception.response.statusCode).eq(201);
    })
    cy.url().should('contain', 'https://gallery-app.vivifyideas.com/');
    createGalleryPage.titleCreatedGallery.eq(0).should('have.text', ('\n          '+galleryData.randomTitle+'\n        '));
    allGalleries.heading.should('have.text', 'All Galleries');
});

it("empty optional description field, title and url format valid fields", ()=>{
    createGalleryPage.createGalleryNoDescription(galleryData.randomTitle, galleryData.randomUrlJpg);
    cy.wait('@submitGallery').then((interception)=> {
        expect(interception.response.statusCode).eq(201);
    })
    cy.url().should('contain', 'https://gallery-app.vivifyideas.com/');
    createGalleryPage.titleCreatedGallery.eq(0).should('have.text', ('\n          '+galleryData.randomTitle+'\n        '));
    allGalleries.heading.should('have.text', 'All Galleries');
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

it("check if cancel button works", ()=>{
    createGalleryPage.getImageButton('Cancel').click();
    cy.url().should('contain', 'https://gallery-app.vivifyideas.com/');
    allGalleries.heading.should('have.text', 'All Galleries');
});  

});
