import selectors from '../support/selectors'

describe('список ингредиентов', () => {
    describe('загрузка списка ингредиентов', () => {
        describe('показывается сообщение о ошибке', () => {
            it('при ответе api с ошибкой', () => {
                cy.openMain({
                    getIngredientsList: {
                        success: false
                    }
                })

                cy.get(selectors.errorNote)
                    .contains('Ошибка при загрузке ингредиентов')
            })

            it('при ответе сервера с ошибкой', () => {
                cy.openMain({
                    getIngredientsList: {
                        statusCode: 500,
                        body: ''
                    }
                })

                cy.get(selectors.errorNote)
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

            cy.get(selectors.loader)
        })

        it('на странице есть список ингредиентов', () => {
            cy.openMain()

            const ingredientNames: string[] = []

            cy.get(selectors.ingredients.ingredient).each($ingredient => {
                const name = $ingredient.find(selectors.ingredients.ingredientTitle).text().trim()
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

            cy.contains(selectors.ingredients.ingredient, 'Краторная булка N-200i').click()
            cy.get(selectors.modal.content).as('modalContent')
            cy.get(selectors.modal.close).as('modalClose')

        })

        it('открывается при клике по ингредиенту', () => {
            cy.get(selectors.modal.title).contains('Детали ингридиента')
            cy.get('@modalContent').get(selectors.ingredientDetails.title).contains('Краторная булка N-200i')

            cy.get('@modalContent').get(selectors.ingredientDetails.calories.title).contains('Калории')
            cy.get('@modalContent').get(selectors.ingredientDetails.calories.value).contains('420')

            cy.get('@modalContent').get(selectors.ingredientDetails.proteins.title).contains('Белки')
            cy.get('@modalContent').get(selectors.ingredientDetails.proteins.value).contains('80')

            cy.get('@modalContent').get(selectors.ingredientDetails.fat.title).contains('Жиры')
            cy.get('@modalContent').get(selectors.ingredientDetails.fat.value).contains('24')

            cy.get('@modalContent').get(selectors.ingredientDetails.carbohydrates.title).contains('Углеводы')
            cy.get('@modalContent').get(selectors.ingredientDetails.carbohydrates.value).contains('53')
        })

        it('закрывается при клике на кнопку закрытия', () => {
            cy.get('@modalContent')

            cy.get('@modalClose').click()

            cy.get('@modalContent').should('not.exist')
        })

        it('закрывается по esc', () => {
            cy.get('@modalContent')

            cy.get('body').type('{esc}')

            cy.get('@modalContent').should('not.exist')
        })
    })
})
