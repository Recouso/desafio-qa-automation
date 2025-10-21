import { buildUserCredentials } from '../../../fixtures/data/account.factory.js' //import para gerar credenciais válidas

describe('Book Store API - fluxo completo', () => {
    let userId //guarda o id do user
    let token //guarda o token gerado

    it('Cria usuário, autentica, aluga 2 livros e valida que usuário alugou os 2 livros', () => {
        const creds = buildUserCredentials() //gera as credenciais

        // 1) cria usuário
        cy.apiPost('/Account/v1/User', creds).then((resUser) => {
            expect(resUser.status).to.equal(201)
            expect(resUser.body).to.have.property('userID') //valida se contem o userId
            userId = resUser.body.userID //guarda o userId

            // 2) gera token utilizando as mesmas credenciais
            return cy.apiPost('/Account/v1/GenerateToken', creds)
        }).then((resTok) => {
            expect(resTok.status).to.equal(200)
            expect(resTok.body).to.have.property('status', 'Success')
            expect(resTok.body).to.have.property('token')
            token = resTok.body.token //guarda o token

            // 3) valida autorização utilizando as mesmas credenciais
            return cy.apiPost('/Account/v1/Authorized', creds)
        }).then((resAuth) => {
            expect(resAuth.status).to.equal(200)
            expect(resAuth.body).to.equal(true)

            // 4) lista livros e escolhe 2 através do isbn
            return cy.apiGet('/BookStore/v1/Books')
        }).then((booksRes) => {
            expect(booksRes.status).to.equal(200)
            const books = booksRes.body.books
            expect(books).to.be.an('array').with.length.greaterThan(1) //conforme solicitado no teste, é necessário selecionar 2 livros sendo assim, fazemos essa validação para ver se vem mais do que 1 livro no array

            const isbns = Cypress._.shuffle(books).slice(0, 2).map(b => b.isbn) //utilizei o shuffle para embaralhar e pegar de forma aleatória os livros
            expect(isbns).to.have.length(2)
            cy.log('Livros selecionados:', JSON.stringify(isbns)) //coloquei um log aqui para visualizar os livros escolhidos


            //5) monta o body para adicionar os livros ao usuário
            const requestBody = {
                userId,
                collectionOfIsbns: isbns.map(i => ({ isbn: i })),
            }
            // 5.1) adiciona os 2 livros ao usuário (com auth que é exigido pela API)
            cy.apiPost('/BookStore/v1/Books', requestBody, token).then((addRes) => {
                expect(addRes.status).to.equal(201)
            })


            // 6) valida que os livros foram adicionados para o usuário em questão (com auth que é exigido pela API)
            return cy.apiGet(`/Account/v1/User/${userId}`, token).then((userRes) => {
                expect(userRes.status).to.equal(200)
                expect(userRes.body).to.have.property('username', creds.userName)
                const userIsbns = (userRes.body.books || []).map(b => b.isbn) //aqui fiz a extração dos livros para a validação de que deu certo
                expect(userIsbns).to.include.members(isbns)
            })

        })
    })


})


