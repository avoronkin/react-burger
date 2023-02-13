import { createAsyncThunk } from '@reduxjs/toolkit'
import { normaApi } from '../../services/norma-api'
import { IIngredient } from '../../types'

export const getIngredients = createAsyncThunk<{ ingredients: IIngredient[], success: boolean }>(
    'burgerIngredients/getIngredients',
    async () => {
        const res = await normaApi.getIngredientsList()

        return {
            ingredients: res.data,
            success: res.success,
        }
    }
)
