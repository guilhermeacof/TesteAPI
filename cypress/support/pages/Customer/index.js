class customer {
	salvar() {
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
        }
}

export default new customer ();