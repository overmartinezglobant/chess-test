
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { setBoardState, setCurrentMove, switchNextPlayer } from '../../../redux/reducers/board'
import './MoveHistory.css'

const chunkArray = (list, size) => {
	const chunked = []

	for (let i = 0; i < list.length; i += size) {
		chunked.push(list.slice(i, i + size))
	}

	return chunked
}

const MoveHistory = ({ history, nextPlayer }) => {
	const dispatch = useDispatch()
	const [movements, setMovements] = useState([])

	useEffect(() => {
		setMovements(chunkArray(history, 2))
	}, [history])

	const onSelectHistoryPoint = ({ board, team }, row, col) => {
		const currentPoint = (row * 2) - col

		dispatch(setBoardState(board))
		dispatch(switchNextPlayer(team))
		dispatch(setCurrentMove(currentPoint))
	}

	return (
		<Table celled striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan="2">{"Move's history"}</Table.HeaderCell>
					<Table.HeaderCell>Play ({nextPlayer})</Table.HeaderCell>
				</Table.Row>
				<Table.Row>
					<Table.HeaderCell>#</Table.HeaderCell>
					<Table.HeaderCell>White</Table.HeaderCell>
					<Table.HeaderCell>Black</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{movements.map((row, rowIndex) => {
					return (
						<Table.Row key={`movement-row-${rowIndex}`}>
							<Table.Cell>{rowIndex + 1}</Table.Cell>
							<Table.Cell
								style={{ cursor: 'pointer' }}
								onClick={() => onSelectHistoryPoint(row[0], (rowIndex + 1), 2)}
							>
								{row[0].move}
							</Table.Cell>
							<Table.Cell
								style={{ cursor: 'pointer' }}
								onClick={() => onSelectHistoryPoint(row[1], (rowIndex + 1), 1)}
							>
								{row[1]?.move}
							</Table.Cell>
						</Table.Row>
					)
				})}
			</Table.Body>
		</Table>
	)
}

const mapStateToProps = ({ board }) => {
	return {
		history: board.history,
		nextPlayer: board.nextPlayer,
	}
}

export default connect(mapStateToProps)(MoveHistory)
