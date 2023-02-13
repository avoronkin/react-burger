
describe('список ингредиентов', () => {
    describe('загрузка списка ингредиентов', () => {
        describe('показывается сообщение о ошибке', () => {
            it('при ответе api с ошибкой', () => {
                cy.openMain({
                    getIngredientsList: {
                        success: false
                    }
                })

                cy.get('[data-test="error-note"]')
                    .contains('Ошибка при загрузке ингредиентов')
            })

            it('при ответе сервера с ошибкой', () => {
                cy.openMain({
                    getIngredientsList: {
                        statusCode: 500,
                        body: ''
                    }
                })

                cy.get('[data-test="error-note"]')
                    .contains('Ошибка при загрузке ингредиентов')
            })
        })

        it('показвается лоадер при ожидании', () => {
            cy.openMain({
                getIngredientsList: {
                    delay: 1000,
                    body: {
                        success: true,
                        data: []
                    }
                },
                wait: false
            })

            cy.get('[data-test="loader"]')
        })

        it('на странице есть список ингредиентов', () => {
            cy.openMain()

            const ingredientNames: string[] = []

            cy.get('[data-test="il-ingredient"]').each($ingredient => {
                const name = $ingredient.find('[data-test="il-ingredient-title"]').text().trim()
                ingredientNames.push(name)
            })
            .then(() => {
                expect(ingredientNames).to.have.members([
                    'Краторная булка N-200i',
                    'Флюоресцентная булка R2-D3',
                    'Соус Spicy-X',
                    'Соус с шипами Антарианского плоскоходца',
                    'Мясо бессмертных моллюсков Protostomia',
                    'Плоды Фалленианского дерева'
                ])
            })
        })
    })

    describe('модальное окно с описанием ингредиента', () => {
        beforeEach(() => {
            cy.openMain()

            cy.get('#modals-root').as('modal')
        })

        it('открывается при клике по ингредиенту', () => {
            cy.contains('Краторная булка N-200i').parent().click()
            cy.get('[data-test="modal-content"]').as('modalContent')

            cy.get('[data-test="modal-title"]').contains('Детали ингридиента')
            cy.get('@modalContent').get('[data-test="id-name"]').contains('Краторная булка N-200i')

            cy.get('@modalContent').get('[data-test="id-calories-title"]').contains('Калории')
            cy.get('@modalContent').get('[data-test="id-calories-value"]').contains('420')

            cy.get('@modalContent').get('[data-test="id-proteins-title"]').contains('Белки')
            cy.get('@modalContent').get('[data-test="id-proteins-value"]').contains('80')

            cy.get('@modalContent').get('[data-test="id-fat-title"]').contains('Жиры')
            cy.get('@modalContent').get('[data-test="id-fat-value"]').contains('24')

            cy.get('@modalContent').get('[data-test="id-carbohydrates-title"]').contains('Углеводы')
            cy.get('@modalContent').get('[data-test="id-carbohydrates-value"]').contains('53')
        })

        it('закрывается при клике на кнопку закрытия', () => {
            cy.contains('Краторная булка N-200i').parent().click()
            cy.get('[data-test="modal-content"]').as('modalContent')
            cy.get('[data-test="modal-close"]').as('modalClose')

            cy.get('@modalContent')

            cy.get('@modalClose').click()

            cy.get('@modalContent').should('not.exist')
        })

        it('закрывается по esc', () => {
            cy.contains('Краторная булка N-200i').parent().click()
            cy.get('[data-test="modal-content"]').as('modalContent')
            cy.get('[data-test="modal-close"]').as('modalClose')

            cy.get('@modalContent')

            cy.get('body').type('{esc}')

            cy.get('@modalContent').should('not.exist')
        })
    })
})
