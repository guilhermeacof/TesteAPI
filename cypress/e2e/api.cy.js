
describe('Teste de API', () => {
  const test = aleatorio()

  
  
    function aleatorio() {
      var text = "";
      var possible = "0123456789";
  
      for (var i = 0; i < 16; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
  
      return text;
    }
  describe('Customer ', () => {
  
 
  let id 

  var conteudo = []


  it('1 - Salvar novo customer no sistema', () => {
     
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

    
    

  })

  it('2 - Deve retornar status 400 quando customer já salvo', () => {
    cy.request({
      method: 'POST',
      url: '/customer',
      failOnStatusCode: false,
      form: false,
      body: {
        birthDate: "1990-05-05",
        lastName: "Cancado",
        name: "Guilherme"+test
      },
    }).then((resp) => {
      expect(resp.status).to.eq(400)
      cy.log(JSON.stringify(resp.body))   
      })  
  })

  it('3 - Deve retornar status 400 quando salvar customer com birth date maior que hoje', () => {
    cy.request({
      method: 'POST',
      url: '/customer',
      failOnStatusCode: false,
      form: false,
      body: {
        birthDate: "2023-05-05",
        lastName: "Cancado",
        name: "Guilherme"+test
      },
    }).then((resp) => {
      expect(resp.status).to.eq(400)
      cy.log(JSON.stringify(resp.body))
      

    })


  })

  it('4 - Deve Procurar customer pelo name e last name', () => {

    cy.request({
      method: 'GET',
      url: '/customer/Guilherme'+test+'/Cancado',
      failOnStatusCode: false,
      form: false,
      body: {
        lastName: "Cancado",
        name: "Guilherme"+test
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200)
      cy.log(JSON.stringify(resp.body))      

    })

  
  })

  it('5 - Deve retornar status 404 quando buscar customer por name e last name inexistente', () => {

    cy.request({
      method: 'GET',
      url: '/customer/Guilherme'+test+'/Cancadooo',
      failOnStatusCode: false,
      form: false,
      body: {
        lastName: "Cancadooo",
        name: "Guilherme"+test
      },
    }).then((resp) => {
      expect(resp.status).to.eq(404)
      cy.log(JSON.stringify(resp.body))      

    })

  
  })

  it('6 - Deve atualizar o last name de um customer', () => {
    
    cy.readFile('cypress/fixtures/captura.json').then((num)=>{
      console.log(num.id)
      id = num.id
      cy.request({
        method: 'PUT',
      url: '/customer/'+id,
      form: false,
      body: {
        birthDate: "1990-05-05",
        lastName: "Cancado"+aleatorio(),
        name: "Guilherme"
      },
        
      }).then((resp) => {
        expect(resp.status).to.eq(200)
        cy.log(JSON.stringify(resp.body)) 
          
  
      })
    })
    

  })

  it('7 - Deve retornar status 404 ao atualizar um customer com id não salvo no sistema', () => {

    cy.request({
      method: 'PUT',
      url: '/customer/'+999,
      failOnStatusCode: false,
      form: false,
      body: {
        birthDate: "1990-05-05",
        lastName: "Cancado",
        name: "Guilherme"
      },
      
    }).then((resp) => {
      expect(resp.status).to.eq(404)
      cy.log(JSON.stringify(resp.body))      

    })

  
  })

  it('8 - Deve deve deletar um customer salvo no sistema', () => {
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

  
  })

  it('9 - Deve retornar status 404 ao deletar um customer com id nao salvo no sistema', () => {

    cy.request({
      method: 'DELETE',
      url: '/customer/4',
      failOnStatusCode: false,
      form: false,
      body: {
      },
      
    }).then((resp) => {
      expect(resp.status).to.eq(404)
      cy.log(JSON.stringify(resp.body))      

    })
  
  })




})

describe('Card ', () => {
  let id 
  it('1 - Deve salvar novo Card no sistema', () => {
    cy.customer()
    cy.readFile('cypress/fixtures/captura.json').then((num)=>{
      console.log(num.id)
      id = num.id

      cy.request({
        method: 'POST',
        url: '/card',
        form: false,
        body: 
          {
            brand: "MASTER",
            customerId: id,
            cvc: "180",
            expirationMoth: '02',
            expirationYear: '2025',
            holderName: "Guilherme",
            number: test
          }  
      }).then((resp) => {
        console.log(resp.body)
        let teste = resp.body
        expect(resp.status).to.eq(200)
        // console.log(JSON.stringify(resp.body))
       cy.writeFile('cypress/fixtures/card.json',JSON.stringify(resp.body))
        // cy.log(JSON.stringify(resp.body))
           cy.log(resp.body.id)  
        })
   
    })


        
     
  })  
  it('2 - Deve retornar status 400 quando salvar card com cvv maior que 999', () => {


    cy.readFile('cypress/fixtures/captura.json').then((num)=>{
      console.log(num.id)
       let id = num.id+1    

       cy.request({
         method: 'POST',
         url: '/card',
         failOnStatusCode: false,
         form: false,
         body: 
           {
             brand: "MASTER",
             customerId: id,
             cvc: "9999",
             expirationMoth: '02',
             expirationYear: '2025',
             holderName: "Guilherme",
             number: "1111111111111112"
           }  
       }).then((resp) => {
        expect(resp.status).to.eq(400)
        cy.log(JSON.stringify(resp.body))      
  
      })
         
       })
 
  })

  it('3 - deve retornar status 400 quando salvar card com expiration month maior que 12', () => {
    cy.readFile('cypress/fixtures/captura.json').then((num)=>{
      console.log(num.id)
       let id = num.id+1    

       cy.request({
         method: 'POST',
         url: '/card',
         failOnStatusCode: false,
         form: false,
         body: 
           {
             brand: "MASTER",
             customerId: id,
             cvc: "123",
             expirationMoth: '13',
             expirationYear: '2025',
             holderName: "Guilherme",
             number: "1111111111111112"
           }  
       }).then((resp) => {
        expect(resp.status).to.eq(400)
        cy.log(JSON.stringify(resp.body))      
  
      })
         
       })
  })

  it('4 - deve retornar status 400 quando salvar card com expiration year menor quue 2022', () => {
  
    cy.readFile('cypress/fixtures/captura.json').then((num)=>{
      console.log(num.id)
       let id = num.id+1    

       cy.request({
         method: 'POST',
         url: '/card',
         failOnStatusCode: false,
         form: false,
         body: 
           {
             brand: "MASTER",
             customerId: id,
             cvc: "123",
             expirationMoth: '12',
             expirationYear: '1923',
             holderName: "Guilherme",
             number: "1111111111111112"
           }  
       }).then((resp) => {
        expect(resp.status).to.eq(400)
        cy.log(JSON.stringify(resp.body))      
  
      })
         
       })


  })

  it('5 - deve retornar status 400 quando salvar card com number de 15 digitos', () => {
  
    cy.readFile('cypress/fixtures/captura.json').then((num)=>{
      console.log(num.id)
       let id = num.id+1    

       cy.request({
         method: 'POST',
         url: '/card',
         failOnStatusCode: false,
         form: false,
         body: 
           {
             brand: "MASTER",
             customerId: id,
             cvc: "123",
             expirationMoth: '10',
             expirationYear: '2025',
             holderName: "Guilherme",
             number: "11111111111111112"
           }  
       }).then((resp) => {
        expect(resp.status).to.eq(400)
        cy.log(JSON.stringify(resp.body))      
  
      })
         
       })

  })

  it('6 - Deve deletar um card salvo no sistema', () => { 

    cy.readFile('cypress/fixtures/card.json').then((num)=>{
      console.log(num.id)
      id = num.id
      cy.request({
        method: 'DELETE',
        url: '/card/'+id,
        form: false,
        body: {
        },
        
      }).then((resp) => {
        expect(resp.status).to.eq(204)
        cy.log(JSON.stringify(resp.body))
          
  
      })
    })
    cy.customerDeletar()
  })

  it('7 - Deve retornar status 404 ao deletar um card com id não salvo no sistema', () => {
        cy.request({
         method: 'DELETE',
         url: '/card/99595',
         failOnStatusCode: false,
         form: false,

       }).then((resp) => {
        expect(resp.status).to.eq(404)
        cy.log(JSON.stringify(resp.body))      
  
      })
         

  })
  })

  

  
  })

  





