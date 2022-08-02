export default class DeleteGallery {
    get gallery(){
        return cy.get('a[class="box-title"]').eq(0);
    }
    get deleteButton(){
        return cy.get('button[class="btn btn-custom"]').eq(0);
    }
    get h1(){
        return cy.get('h1');
    }
    get myGalleriesButton(){
        return cy.get('a[href="/my-galleries"]');
    }
    deleteGallery(){
        this.myGalleriesButton.click();
        this.gallery.click();
        this.deleteButton.click();
    }
}
export const deleteGallery = new DeleteGallery();

