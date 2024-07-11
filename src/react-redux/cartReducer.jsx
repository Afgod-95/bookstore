import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"


export const resetCart = createAsyncThunk('cart/resetCart', async (_, {dispatch}) => {
    dispatch(cartSlice.actions.clearCart())
})

const initialState = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find(product => product.id === action.payload.id )
            if(item) {
                item.quantity += action.payload.quantity
            } 
            else {
                state.products.push({ ...action.payload, quantity: 1 })
            }
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const product = state.products.find(product => product.id === id)
            if( product) {
                product.quantity = quantity
            }
        },

        totalPrice: (state) => {
            let total = 0
            state.products.forEach(product => {
                total += product.price * product.quantity
            })
            return total
        },

        removeItem: (state, action) => {
            const product = state.products.filter(product => product.id !== action.payload)
            state.products = product
        },

        clearCart: (state) => {
            state.products = []
        },

        extraReducers: (builder) => {
            builder.addCase(resetBook.fulfilled, (state) => {
                state.cart = []
            });
        },
    }

})

export const {addToCart, updateCartQuantity, updateQuantity, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer