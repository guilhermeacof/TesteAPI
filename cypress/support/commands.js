/// <reference path="./e2e.js" />
// -- This is a parent command --
const test = aleatorio()
var conteudo = []
let id 
Cypress.Commands.add("login", () => {

	cy.visit("https://www.advantageonlineshopping.com");
	cy.get('#menuUser').click()
	cy.get('[a-hint="Username"] > .inputContainer > .ng-pristine').type('TesteQA')
	cy.get('[a-hint="Password"] > .inputContainer > .ng-pristine').type('Asd123')
	cy.wait(800)
	cy.get('#sign_in_btnundefined').click()
	cy.get('#menuUserLink').contains('TesteQA')

	// cy.request("/accountservice/ws/AccountLoginRequest").then((response) => {
	// 	expect(response.status).to.eq(200);
	// });	
   

});

Cypress.Commands.add("customer", () => {

	cy.request({
		method: 'POST',
		url: '/customer',
		form: false,
		body: {
		  birthDate: "1990-05-05",
		  lastName: "Cancado",
		  name: "Guilherme"+test
		},
		
	  })
	
	  cy.request({
		method: 'GET',
		url: '/customer',
		form: false,  
		
	  }).then((resp) => {
		let teste = resp.body
		expect(resp.status).to.eq(200)
		// console.log(JSON.stringify(resp.body))
		console.log(JSON.stringify(resp.body[0].id))
		cy.writeFile('cypress/fixtures/captura.json',JSON.stringify(resp.body[0]))
		// cy.log(JSON.stringify(resp.body))
	
		teste.forEach(element => {
		  conteudo.push(element.id)
		}); 
		 cy.log(resp.body.id)  
		})


		

});

Cypress.Commands.add("customerDeletar", () => {

	cy.readFile('cypress/fixtures/captura.json').then((num)=>{
		console.log(num.id)
		id = num.id
		cy.request({
		  method: 'DELETE',
		  url: '/customer/'+id,
		  form: false,
		  body: {
		  },
		  
		}).then((resp) => {
		  expect(resp.status).to.eq(204)
		  cy.log(JSON.stringify(resp.body))
			
	
		})
	  })


		

});

function aleatorio() {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 3; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }




//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })