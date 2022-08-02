///<reference types="Cypress" />

const Locators = require('../fixtures/Locators.json');
const faker = require('faker');

describe('Improved login', ()=> {
    let userData = {
        randomName: faker.name.findName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password()
    };
    let correctEmail = 'srdjan.mutlak@gmail.com';
    let correctPassword= '12345678';
    before('visit link', ()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app');
    });

    //POSITIVE TEST CASES
//login with correct credentials
    it("login with correct credentials",()=>{
        cy.get(Locators.Header.Login).click();
        cy.get(Locators.LoginPage.Email).type(correctEmail);
        cy.get(Locators.LoginPage.Password).type(correctPassword);
        cy.get(Locators.LoginPage.SubmitButton).click();
        cy.get(Locators.Header.LogoutButton).should('be.visible');
    });

     //logout
     it("logout", ()=>{
        cy.get(Locators.Header.LogoutButton).click();
        cy.get(Locators.Header.LogoutButton).should('not.exist');

    });


    //login with invalid data
    it("login with invalid data", ()=>{
        cy.get(Locators.Header.Login).click();
        cy.get(Locators.LoginPage.Email).type(userData.randomEmail);
        cy.get(Locators.LoginPage.Password).type(userData.randomPassword);
        cy.get(Locators.LoginPage.SubmitButton).click();
        cy.get(Locators.Header.LogoutButton).should('not.exist');
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/login');
        cy.get('p[class="alert alert-danger"]').should('be.visible').and('contain', "Bad Credentials");
    });
});
