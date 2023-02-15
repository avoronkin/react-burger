/// <reference types="cypress" />

import { RouteHandler } from 'cypress/types/net-stubbing'
import { BASE_URL, ROUTES } from '../../src/constants'

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

interface OpenMainParams {
    getIngredientsList?: RouteHandler
    wait?: boolean
}
Cypress.Commands.add('openMain', (params?: OpenMainParams) => {
    cy.setCookie('accessToken', 'Bearer accessToken')
    cy.intercept(
        {
            url: `https://norma.nomoreparties.space/api/auth/user`,
            method: 'GET',
            headers: {
                'authorization': 'Bearer accessToken'
            }
        },
        { fixture: 'get_user' }
    ).as('getUser')
    // cy.wait('@getUser')
    
    cy.intercept(
        {
            url: `${BASE_URL}/ingredients`,
            method: 'GET',
        },
        params?.getIngredientsList ? params?.getIngredientsList : { fixture: 'get_ingredients'}
    ).as('getIngredientsList')

    cy.visit(ROUTES.MAIN)

    
    if (params?.wait || params?.wait === undefined) {
        cy.wait('@getIngredientsList')
    }
})

// Cypress.Commands.add('dragTo', (subject, targetEl) => {
//     cy.wrap(subject).trigger("dragstart");
//     cy.get(targetEl).trigger("drop");
//   }
// );

declare global {
    namespace Cypress {
        interface Chainable {
            openMain(params?: OpenMainParams): Chainable<void>
            // dragTo(): Chainable<void>
        }
    }
}
