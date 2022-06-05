import { useEffect, useState } from 'react'

const pieceStyles = {
	backgroundSize: '100%',
	cursor: '-webkit-grab',
	height: '100%',
	left: '0',
	overflow: 'hidden',
	top: '0',
	touchAction: 'none',
	width: '100%',
	willChange: 'transform',
	backgroundRepeat: 'no-repeat',
}

const Piece = ({ pieceName, onClick = () => null }) => {
	const [pieceImage, setPieceImage] = useState('')

	useEffect(() => {
		if (pieceName) {
			setPieceImage(`/images/${pieceName}.png`)
		} else {
			setPieceImage('')
		}
	}, [pieceName])

	const styles = {
		...pieceStyles,
		backgroundImage: `url(${pieceImage})`,
	}

	return (
		<div className='piece' onClick={onClick} style={styles}/>
	)
}

export default Piece
