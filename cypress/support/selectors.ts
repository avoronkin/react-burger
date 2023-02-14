export default {
    ingredients: {
        ingredient: '[data-test="il-ingredient"]',
        ingredientTitle: '[data-test="il-ingredient-title"]',
    },
    ingredientDetails: {
        title: '[data-test="id-name"]',
        calories: {
            title: '[data-test="id-calories-title"]',
            value: '[data-test="id-calories-value"]',
        },
        proteins: {
            title: '[data-test="id-proteins-title"]',
            value: '[data-test="id-proteins-value"]',
        },
        fat: {
            title: '[data-test="id-fat-title"]',
            value: '[data-test="id-fat-value"]',
        },
        carbohydrates: {
            title: '[data-test="id-carbohydrates-title"]',
            value: '[data-test="id-carbohydrates-value"]',
        }
    },
    burger: {
        main: '[data-test="bc"]',
        bunTop: '[data-test="bc-ingredient-bun-top"]',
        bunBottom: '[data-test="bc-ingredient-bun-bottom"]',
        mainIngredient: '[data-test="bc-ingredient"]',
        totalCost: '[data-test="bc-cost"]',
        createOrder: '[data-test="bc-order-button"]'
    },
    modal: {
        content: '[data-test="modal-content"]',
        title: '[data-test="modal-title"]',
        close: '[data-test="modal-close"]',
    },
    errorNote: '[data-test="error-note"]',
    loader: '[data-test="loader"]',
}
