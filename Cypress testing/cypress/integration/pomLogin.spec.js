///<reference types="Cypress" />

import {loginPage} from './../page_objects/loginPage';
const faker = require('faker');

describe('POM login', ()=> {
    let userData = {
        randomEmail:faker.internet.email(),
        randomPassword:faker.internet.password()
    }
    let correctEmail = 'srdjan.mutlak@gmail.com';
    let correctPassword= '12345678';
    beforeEach('visit link', ()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app');
    });

    it("login with invalid data", ()=>{
        loginPage.loginButton.click();
        loginPage.login(correctEmail, userData.randomPassword);
        cy.url().should('contains', 'https://gallery-app.vivifyideas.com/login');
        cy.get('p[class="alert alert-danger"]').should('be.visible').and('contain', "Bad Credentials");   
    });

    it("login with correct credentials",()=>{
        loginPage.loginButton.click();
        loginPage.login(correctEmail, correctPassword);
        loginPage.logoutButton.should('be.visible');
    });

    it("logout", ()=>{
        loginPage.loginButton.click();
        loginPage.login(correctEmail, correctPassword);
        loginPage.logoutButton.should('be.visible');
        loginPage.logoutButton.click();
        loginPage.logoutButton.should('not.exist');
    });
});
