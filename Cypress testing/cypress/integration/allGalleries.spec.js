///<reference types="Cypress" />

import {allGalleries} from './../page_objects/allGalleries';

before('visit link', ()=>{
    cy.visit('/');
});

it("all galleries page contains 10 galleries", ()=>{
    cy.intercept(
        "GET",
        "https://gallery-api.vivifyideas.com/api/galleries?page=1&term=",
        ()=>{}
    ).as("visitedAllGalleriesPage");
    cy.wait('@visitedAllGalleriesPage').then((interception)=>{
        expect(interception.response.statusCode).eq(200);
    })
    allGalleries.divCell.should('have.length', 10);
    allGalleries.heading.should('have.text', 'All Galleries');
});

it("check if there is additional 10 galleries when user clicks load more button", ()=>{
    cy.intercept(
        "GET",
        "https://gallery-api.vivifyideas.com/api/galleries?page=2&term=",
        ()=>{}
    ).as("visitedAllGalleriesPageNext");
    allGalleries.loadMoreButton.click();
    cy.wait('@visitedAllGalleriesPageNext').then((interception)=>{
        expect(interception.response.statusCode).eq(200);
    })
    allGalleries.divCell.should('have.length', 20);
});

