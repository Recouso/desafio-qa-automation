const authHeaders = (token) => token ? { Authorization: `Bearer ${token}` } : {}

Cypress.Commands.add('apiPost', (path, body, token, opts = {}) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}${path}`,
    body,
    headers: { 'Content-Type': 'application/json', ...authHeaders(token), ...opts.headers },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('apiGet', (path, token, opts = {}) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}${path}`,
    headers: { ...authHeaders(token), ...opts.headers },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('apiDelete', (path, body, token, opts = {}) => {
  return cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiBaseUrl')}${path}`,
    body,
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    failOnStatusCode: false
  })
})
