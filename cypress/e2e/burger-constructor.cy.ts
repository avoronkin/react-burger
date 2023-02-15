import selectors from '../support/selectors'

describe('конструктор бургеров', () => {
    beforeEach(() => {
        cy.openMain()
    })

    describe('перетаскивание ингредиента в конструктор', () => {
        it('перетаскивание булки', () => {
            cy.get(selectors.burger.bunTop).contains('Булка не выбрана')
            cy.get(selectors.burger.bunBottom).contains('Булка не выбрана')
            cy.get(selectors.burger.totalCost).then($burgerTotlaCost => {
                const burgerTotalCost = $burgerTotlaCost.text().trim()
                expect(burgerTotalCost).eq('0')
            })

            cy.contains(selectors.ingredients.ingredient, 'Краторная булка N-200i').trigger('dragstart')
            cy.get(selectors.burger.main).trigger('drop')

            cy.get(selectors.burger.bunTop).contains('Краторная булка N-200i (верх)')
            cy.get(selectors.burger.bunBottom).contains('Краторная булка N-200i (низ)')
            cy.get(selectors.burger.totalCost).then($burgerTotlaCost => {
                const burgerTotlaCost = $burgerTotlaCost.text().trim()
                expect(burgerTotlaCost).eq('2510')
            })
        })

        it('перетаскивание основного ингредиента', () => {
            cy.get(selectors.burger.main).as('burgerConstuctor')

            cy.get('@burgerConstuctor').contains('Ингредиенты не выбраны')
            cy.get(selectors.burger.mainIngredient).should('not.exist')
            cy.get(selectors.burger.totalCost).then($burgerTotlaCost => {
                const burgerTotlaCost = $burgerTotlaCost.text().trim()
                expect(burgerTotlaCost).eq('0')
            })

            cy.contains(selectors.ingredients.ingredient, 'Мясо бессмертных моллюсков Protostomia').trigger('dragstart')
            cy.get('@burgerConstuctor').trigger('drop')

            cy.get(selectors.burger.mainIngredient).contains('Мясо бессмертных моллюсков Protostomia')
            cy.get(selectors.burger.totalCost).then($burgerTotlaCost => {
                const burgerTotlaCost = $burgerTotlaCost.text().trim()
                expect(burgerTotlaCost).eq('1337')
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

            cy.contains(selectors.ingredients.ingredient, 'Краторная булка N-200i').as('bunIngredient')
            cy.contains(selectors.ingredients.ingredient, 'Мясо бессмертных моллюсков Protostomia').as('mainIngredient')
            cy.get(selectors.burger.main).as('burgerConstuctor')

            cy.get(selectors.modal.content).should('not.exist')
            cy.get(selectors.burger.bunTop).contains('Булка не выбрана')
            cy.get(selectors.burger.bunBottom).contains('Булка не выбрана')
            cy.get('@burgerConstuctor').contains('Ингредиенты не выбраны')
            cy.get(selectors.burger.mainIngredient).should('not.exist')
            cy.get(selectors.burger.totalCost).then($burgerTotlaCost => {
                const burgerTotlaCost = $burgerTotlaCost.text().trim()
                expect(burgerTotlaCost).eq('0')
            })

            cy.get('@bunIngredient').trigger('dragstart')
            cy.get('@burgerConstuctor').trigger('drop')
            cy.get('@mainIngredient').trigger('dragstart')
            cy.get('@burgerConstuctor').trigger('drop')

            cy.get(selectors.burger.createOrder).click()
            cy.wait('@createOrder')
            
            cy.get(selectors.modal.content).as('modalContent')
            cy.get(selectors.modal.close).as('modalClose')

            cy.get('@modalContent').contains('40651')
            cy.get('@modalContent').contains('Ваш заказ начали готовить')

            cy.get('@modalClose').click()
            cy.get('@modalContent').should('not.exist')
        })

    })
})
