export default class AllGalleries {
    get loadMoreButton(){
        return cy.get('button[class="btn btn-custom"]');
    };
    get divCell(){
        return cy.get('div[class="cell"]');
    }
    get heading(){
        return cy.get('h1');
    }
}

export const allGalleries = new AllGalleries();
