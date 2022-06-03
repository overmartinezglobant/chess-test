import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import BoardCell from './BoardCell/BoardCell'
import FlipBoardButton from './FlipBoardButton/FlipBoardButton'
import './ChessBoard.css'
import { makeMovement, switchNextPlayer } from '../../../redux/reducers/board'

const ChessBoard = ({ board, isFlipped, nextPlayer }) => {
	const [boardState, setBoardState] = useState([])
	const [selected, setSelected] = useState(null)
	const dispatch = useDispatch()

	useEffect(() => {
		if (isFlipped) {
			setBoardState(
				board
					.slice()
					.reverse()
					.map((row) => row.slice().reverse()),
			)
		} else {
			setBoardState([...board])
		}
	}, [isFlipped, board])

	const handleMakeMovementAction = ({ from, to }) => {
		const { cell: fromCell } = from
		const { cell: toCell } = to

		if (fromCell.team === toCell.team) {
			return
		}

		dispatch(makeMovement({ from, to, isFlipped }))
		dispatch(switchNextPlayer())
	}

	const handleClick = (cell, row, col) => {
		if (selected && selected.row === row && selected.col === col) {
			setSelected(null)
		} else if (selected && (selected.row !== row || selected.col !== col)) {
			handleMakeMovementAction({
				from: { ...selected },
				to: { row, col, cell },
			})
			setSelected(null)
		} else if (cell.piece && cell.team === nextPlayer) {
			setSelected({ row, col, cell })
		}
	}

	return (
		<div className="board-container">
			<div className="board-header">
				<FlipBoardButton />
				<div>
					selected: {JSON.stringify(selected)}
				</div>
			</div>
			<div className='chess-board'>
				{boardState.map((row, rowIndex) => {
					return (
						<React.Fragment key={rowIndex}>
							{row.map((cell, colIndex) => {
								return (
									<div style={{ padding: 0 }}
										key={`${rowIndex}-${colIndex}`}>
										<BoardCell
											x={rowIndex}
											y={colIndex}
											cell={cell}
											onClick={(selectedCell) => handleClick(selectedCell, rowIndex, colIndex)}
											type={rowIndex % 2 === colIndex % 2 ? 'pair' : 'odd'}
										/>
									</div>
								)
							})}
						</React.Fragment>
					)
				})}
			</div>
		</div>
	)
}

const mapStateToProps = ({ board }) => {
	return {
		board: board.board,
		isFlipped: board.isFlipped,
		nextPlayer: board.nextPlayer,
	}
}

export default connect(mapStateToProps)(ChessBoard)
