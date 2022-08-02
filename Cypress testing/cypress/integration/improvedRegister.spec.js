///<reference types="Cypress" />

const Locators = require('../fixtures/Locators.json');
const faker = require('faker');

describe('Improved register', ()=> {

    let userData = {
        randomFirstName: faker.name.findName(),
        randomLastName : faker.name.findName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password()
    }
    // let correctFirstName = 'Srdjan';
    // let correctLastName = 'Mutlak';
    // let correctRegisterEmail = 'srdjan.mutlak@gmail.com';
    // let correctRegisterPassword= '12345678';
    // let correctPasswordConfirmation = '12345678';
    before('visit link', ()=>{
        cy.visit('/');
    });
//register with correct credentials
it("register with correct credentials", ()=>{
    cy.get(Locators.Header.Register).click();
    cy.get(Locators.RegisterPage.FirstName).type(userData.randomFirstName);
    cy.get(Locators.RegisterPage.LastName).type(userData.randomLastName);
    cy.get(Locators.RegisterPage.Email).type(userData.randomEmail);
    cy.get(Locators.RegisterPage.Password).type(userData.randomPassword);
    cy.get(Locators.RegisterPage.PasswordConfirmation).type(userData.randomPassword);
    cy.get(Locators.RegisterPage.Checkbox).check();
    cy.get(Locators.RegisterPage.SubmitButton).click();
    cy.get(Locators.Header.LogoutButton).should('be.visible');
    });


});
