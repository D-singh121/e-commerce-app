import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./CartSlice";

const myStore = configureStore({
	reducer: {
		cart: cartSlice

	},
	devTools: true
})


export default myStore;