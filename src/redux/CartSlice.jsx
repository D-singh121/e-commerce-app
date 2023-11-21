import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
	name: "cart",
	initialState: [{
		// status: false,
		// users: null
	}],
	reducers: {
		// login: (state, action) => {
		// 	state.status = true;
		// 	state.userData = action.payload.userData

		// },
		// logout: (state) => {
		// 	state.status = false;
		// 	state.userData = null
		// },


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