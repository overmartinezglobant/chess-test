import { useEffect, useState } from 'react'
import './BoardCell.css'
import Piece from './Piece'

const BoardCell = ({
	cell,
	x,
	y,
	type = 'pair',
	onClick = (a) => null,
}) => {
	const [number, setNumber] = useState('')
	const [letter, setLetter] = useState('')

	useEffect(() => {
		if (x === 7) {
			setLetter(cell.x)
		}
		if (y === 0) {
			setNumber(cell.y)
		}
	}, [cell])

	const pieceName = cell.team + cell.piece

	return (
		<div className={`board-cell ${type}`} onClick={() => onClick(cell)}>
			{cell.piece && <Piece pieceName={pieceName} />}
			<div className="cell-indicator number">{number}</div>
			<div className="cell-indicator letter">{letter}</div>
		</div>
	)
}

export default BoardCell
