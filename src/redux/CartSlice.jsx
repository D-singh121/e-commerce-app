import { createSlice } from "@reduxjs/toolkit"

//***** agar cart me value hai to use initialstate me update kar denge localstorage se lekar nahi to empty cart show kar denge  */
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.push(action.payload)
		},
		deleteFromCart: (state, action) => {
			return state.filter((item) => (item.id !== action.payload.id))
		}
	}
})


export const { addToCart, deleteFromCart } = cartSlice.actions
export default cartSlice.reducer;