var Chance = require("chance");
var chance = new Chance();
require("cypress-xpath");
import conta from "../support/pages/Conta";

describe('empty spec', () => {

  beforeEach(() => {		

	});

	after(() => {
		cy.clearLocalStorage();
    cy.clearCookies();
	});


  it('CT-01 Criação de uma conta', () => {
    conta.criar()
  })

  it('CT-02 Realização do login com a conta criada', () => {
    cy.login()
  })

  it('CT-03 Exclusão da conta', () => {
    conta.excluir()

  })

})