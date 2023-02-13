
describe('конструктор бургеров', () => {
    beforeEach(() => {
        cy.openMain()
    })

    describe('перетаскивание ингредиента в конструктор', () => {
        it('перетаскивание булки', () => {
            cy.contains('[data-test="il-ingredient"]', 'Краторная булка N-200i').as('bunIngredient')
            cy.get('[data-test="bc"]').as('burgerConstuctor')

            cy.get('[data-test="bc-ingredient-bun-top"]').contains('Булка не выбрана')
            cy.get('[data-test="bc-ingredient-bun-bottom"]').contains('Булка не выбрана')
            cy.get('[data-test="bc-cost"]').then($burgerCost => {
                const burgerCost = $burgerCost.text().trim()
                expect(burgerCost).eq('0')
            })

            cy.get('@bunIngredient').trigger('dragstart')
            cy.get('@burgerConstuctor').trigger('drop')

            cy.get('[data-test="bc-ingredient-bun-top"]').contains('Краторная булка N-200i (верх)')
            cy.get('[data-test="bc-ingredient-bun-bottom"]').contains('Краторная булка N-200i (низ)')
            cy.get('[data-test="bc-cost"]').then($burgerCost => {
                const burgerCost = $burgerCost.text().trim()
                expect(burgerCost).eq('2510')
            })
        })

        it('перетаскивание основного ингредиента', () => {
            cy.contains('[data-test="il-ingredient"]', 'Мясо бессмертных моллюсков Protostomia').as('mainIngredient')
            cy.get('[data-test="bc"]').as('burgerConstuctor')


            cy.get('@burgerConstuctor').contains('Ингредиенты не выбраны')
            cy.get('[data-test="bc-ingredient"]').should('not.exist')
            cy.get('[data-test="bc-cost"]').then($burgerCost => {
                const burgerCost = $burgerCost.text().trim()
                expect(burgerCost).eq('0')
            })

            cy.get('@mainIngredient').trigger('dragstart')
            cy.get('@burgerConstuctor').trigger('drop')

            cy.get('[data-test="bc-ingredient"]').contains('Мясо бессмертных моллюсков Protostomia')
            cy.get('[data-test="bc-cost"]').then($burgerCost => {
                const burgerCost = $burgerCost.text().trim()
                expect(burgerCost).eq('1337')
            })
        })
    })

    describe('оформление заказа', () => {
        it('оформление заказа', () => {
            cy.intercept(
                {
                    url: `https://norma.nomoreparties.space/api/orders`,
                    method: 'POST',
                    headers: {
                        'authorization': 'Bearer accessToken'
                    },
                },
                {
                    fixture: 'create_order'
                }
            ).as('createOrder')

            cy.contains('[data-test="il-ingredient"]', 'Краторная булка N-200i').as('bunIngredient')
            cy.contains('[data-test="il-ingredient"]', 'Мясо бессмертных моллюсков Protostomia').as('mainIngredient')
            cy.get('[data-test="bc"]').as('burgerConstuctor')

            cy.get('[data-test="modal-content"]').should('not.exist')
            cy.get('[data-test="bc-ingredient-bun-top"]').contains('Булка не выбрана')
            cy.get('[data-test="bc-ingredient-bun-bottom"]').contains('Булка не выбрана')
            cy.get('@burgerConstuctor').contains('Ингредиенты не выбраны')
            cy.get('[data-test="bc-ingredient"]').should('not.exist')
            cy.get('[data-test="bc-cost"]').then($burgerCost => {
                const burgerCost = $burgerCost.text().trim()
                expect(burgerCost).eq('0')
            })

            cy.get('@bunIngredient').trigger('dragstart')
            cy.get('@burgerConstuctor').trigger('drop')
            cy.get('@mainIngredient').trigger('dragstart')
            cy.get('@burgerConstuctor').trigger('drop')

            cy.get('[data-test="bc-order-button"]').click()
            cy.wait('@createOrder')
            
            cy.get('[data-test="modal-content"]').as('modalContent')
            cy.get('[data-test="modal-close"]').as('modalClose')

            cy.get('@modalContent').contains('40651')
            cy.get('@modalContent').contains('Ваш заказ начали готовить')

            cy.get('@modalClose').click()
            cy.get('@modalContent').should('not.exist')
        })

    })
})
