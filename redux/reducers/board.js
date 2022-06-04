import { createSlice } from '@reduxjs/toolkit'
import { BoardState } from '../state'
import { BOARD } from '../types'

const initialState = {
	board: BoardState,
	isFlipped: false,
	nextPlayer: 'w',
	isMovementDisabled: false,
	history: [],
}

const getMatrixFlipped = (state, isFlipped) => {
	if (isFlipped) {
		return state
			.slice()
			.reverse()
			.map((row) => row.slice().reverse())
	}

	return state.slice()
}

export const boardSlice = createSlice({
	name: BOARD.NAME,
	initialState,
	reducers: {
		resetBoard: (state) => {
			state.board = [...BoardState]
			state.history = []
		},
		setBoardState: (state, { payload }) => {
			state.board = [...payload]
		},
		makeMovement: (state, { payload }) => {
			const { from, to, isFlipped } = payload
			const stateData = getMatrixFlipped(state.board, isFlipped)
			const fromCell = stateData[from.row][from.col]

			stateData[to.row][to.col].piece = fromCell.piece
			stateData[to.row][to.col].team = fromCell.team
			stateData[from.row][from.col].piece = ''
			stateData[from.row][from.col].team = ''

			state.board = [...getMatrixFlipped(stateData, isFlipped)]
		},
		setFlippedBoard: (state, { payload }) => {
			state.isFlipped = payload
		},
		setMovementDisable: (state, { payload }) => {
			state.isMovementDisabled = payload
		},
		switchNextPlayer: (state, { payload }) => {
			if (!payload) {
				state.nextPlayer = state.nextPlayer === 'w' ? 'b' : 'w'

				return
			}

			state.nextPlayer = payload === 'w' ? 'b' : 'w'
		},
		addMovementToHistory: (state, { payload }) => {
			state.history.push({
				board: [...state.board],
				...payload,
			})
		},
	},
})

export const {
	resetBoard,
	setBoardState,
	makeMovement,
	setFlippedBoard,
	switchNextPlayer,
	setMovementDisable,
	addMovementToHistory,
} = boardSlice.actions

export default boardSlice.reducer
