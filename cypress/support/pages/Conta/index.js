const el = require("./elements").ELEMENTS;

class conta {
	criar() {

        cy.visit('https://www.advantageonlineshopping.com')
        cy.get('#menuUser').click()
        cy.get('.create-new-account').click()

        //Criando Usuário
        cy.get(el.username).type('TesteQA')
        cy.get(el.email).type(chance.email())
        cy.get(el.password).type('Asd123')
        cy.get(el.confirmPassword).type('Asd123')

        cy.get(el.firstName).type(chance.first())
        cy.get(el.lastName).type(chance.last())
        cy.get(el.phoneNumber).type('4002-8922')

        //cy.get(el.country).select('USA')

        cy.get(el.city).type(chance.city())
        cy.get(el.address).type(chance.address())
        cy.get(el.state).type(chance.state())
        cy.get(el.postalCode).type(chance.zip())
        cy.get(el.iAgree).check()
        cy.get('#register_btnundefined').click()
        
    


        
	
	}

        excluir(){

                
                cy.get('#menuUserLink').click()
                cy.get('#loginMiniTitle > [translate="My_account"]').click()
                cy.get('.deleteMainBtnContainer').click()
                cy.get('.deleteRed').click()
                
        }
}

export default new conta ();