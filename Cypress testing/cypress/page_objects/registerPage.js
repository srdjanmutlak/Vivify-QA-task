export default class RegisterPage {
    get registerPageButton(){
        return cy.get('a[href="/register"]');
    }
    get checkboxInput(){
        return cy.get('input[type="checkbox"]');
    }
    get submitButton(){
        return cy.get('button[type="submit"]');
    }
    get errorMessage(){
        return cy.get('p[class="alert alert-danger"]');
    }
    get h1(){
        return cy.get('h1');
    }
    getInputField(id){
        return cy.get(`#${id}`);
    }
    register(firstName, lastName, email, password, passwordConfirmation){
        this.getInputField('first-name').type(firstName);
        this.getInputField('last-name').type(lastName);
        this.getInputField('email').type(email);
        this.getInputField('password').type(password);
        this.getInputField('password-confirmation').type(passwordConfirmation);
        this.checkboxInput.check();
        this.submitButton.click();
}
    registerNoFirstName(lastName, email, password, passwordConfirmation){
        this.getInputField('last-name').type(lastName);
        this.getInputField('email').type(email);
        this.getInputField('password').type(password);
        this.getInputField('password-confirmation').type(passwordConfirmation);
        this.checkboxInput.check();
        this.submitButton.click();
}
    registerSkippedTerms(firstName, lastName, email, password, passwordConfirmation){
        this.getInputField('first-name').type(firstName);
        this.getInputField('last-name').type(lastName);
        this.getInputField('email').type(email);
        this.getInputField('password').type(password);
        this.getInputField('password-confirmation').type(passwordConfirmation);
        this.submitButton.click();
    }
}
export const registerPage = new RegisterPage();
