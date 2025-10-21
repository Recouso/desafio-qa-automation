import * as fakerImport from '@faker-js/faker'
const faker = fakerImport.faker || fakerImport

export const buildUserCredentials = () => {

  const userName = `user_${faker.string.alphanumeric({ length: 8 }).toLowerCase()}`

  // Realizando as regras do DemoQA: Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.
  const password = `Aa!${faker.internet.password({ length: 10, memorable: false })}9`

  return { userName, password }
}
