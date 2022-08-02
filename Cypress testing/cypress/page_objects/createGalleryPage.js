export default class CreateGalleryPage {
    get h1Title(){
        return cy.get('h1');
    }
    get createGalleryButton(){
        return cy.get('a[href="/create"]');
    }
    get myGalleriesButton(){
        return cy.get('a[href="/my-galleries"]');
    }
    getImageButton(name){
        return cy.get('button').contains(name);
    }
    getInputField(name){
        return cy.get(`input[id=${name}]`);
    }
    get image(){
        return cy.get('input[type="url"]');
    }
    get buttonArrow(){
        return cy.get('button[class="input-buttons"]');
    }
    get errorMessage(){
        return cy.get('p[class="alert alert-danger"]');
    }
    get titleCreatedGallery(){
        return cy.get('a[class="box-title"]').eq(0);
    }
    createGallery(title, description, image){
        this.createGalleryButton.click();
        this.getInputField('title').clear().type(title);
        this.getInputField('description').clear().type(description);
        this.image.eq(0).clear().type(image);
        this.getImageButton('Submit').click();
    }
    createGalleryNoUrl(title, description){
        this.createGalleryButton.click();
        this.getInputField('title').clear().type(title);
        this.getInputField('description').clear().type(description);
        this.image.eq(0).clear();
        this.getImageButton('Submit').click();
    }
    createGalleryTwoUrls(title, description, image, secondImage){
        this.createGalleryButton.click();
        this.getInputField('title').clear().type(title);
        this.getInputField('description').clear().type(description);
        this.image.eq(0).clear().type(image);
        this.getImageButton('Add image').click();
        this.image.eq(1).clear().type(secondImage);
        this.getImageButton('Submit').click();
    }
    createGalleryNoDescription(title, image){
        this.createGalleryButton.click();
        this.getInputField('title').clear().type(title);
        this.getInputField('description').clear();
        this.image.eq(0).clear().type(image);
        this.getImageButton('Submit').click();
    }
    checkButton(title, description, image, secondImage){
        this.createGalleryButton.click();
        this.getInputField('title').clear().type(title);
        this.getInputField('description').clear().type(description);
        this.image.eq(0).clear().type(image);
        this.getImageButton('Add image').click();
        this.image.eq(1).clear().type(secondImage);
        cy.wait(3000);
    }

    createGalleryNew(title, description = false, images=false){
        this.createGalleryButton.click();
        this.getInputField('title').clear().type(title);
        description 
            ? this.getInputField('description').clear().type(description)
            : this.getInputField('description').clear();
        images
            ? images.map((image, index) => {
                index && this.getImageButton('Add image').click();
                this.image.eq(index).clear().type(image);
            })
            : this.image.eq(0).clear();
        this.getImageButton('Submit').click();
}
}

export const createGalleryPage = new CreateGalleryPage();
