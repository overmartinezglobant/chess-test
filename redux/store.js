import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './reducers/board'

export default configureStore({
	reducer: {
		board: boardReducer,
	},
})
