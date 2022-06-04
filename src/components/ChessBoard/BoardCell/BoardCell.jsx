import { useEffect, useState } from 'react'
import './BoardCell.css'
import Piece from './Piece'

const BoardCell = ({
	cell,
	x,
	y,
	type = 'pair',
	selected,
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
	const isSelected = selected && selected.row === x && selected.col === y

	return (
		<div className={`board-cell ${type} ${isSelected && 'selected'}`} onClick={() => onClick(cell)}>
			{cell.piece && <Piece pieceName={pieceName} />}
			<div className="cell-indicator number">{number}</div>
			<div className="cell-indicator letter">{letter}</div>
		</div>
	)
}

export default BoardCell
