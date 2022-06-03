import { faChessKing } from '@fortawesome/free-regular-svg-icons'
import {
	faChessKing as faChessKingSolid,
	faRepeat,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch } from 'react-redux'
import { Button, Popup } from 'semantic-ui-react'
import { resetBoard, setFlippedBoard } from '../../../../redux/reducers/board'
import './FlipBoardButton.css'

const FlipBoardButton = ({ isFlipped }) => {
	const dispatch = useDispatch()

	const handleClick = (type) => {
		dispatch(setFlippedBoard(type === 'flip'))
	}

	const handleRestore = () => {
		dispatch(resetBoard())
	}

	return (
		<div className="flip-board-button">
			<Popup
				content='Play with white pieces'
				trigger={
					<Button
						basic
						primary={isFlipped === false}
						icon={<FontAwesomeIcon icon={faChessKing} size="2x" />}
						onClick={() => handleClick('normal')}
					/>
				}
			/>

			<Popup
				content='Play with black pieces'
				trigger={
					<Button
						basic
						primary={isFlipped}
						icon={<FontAwesomeIcon icon={faChessKingSolid} size="2x" />}
						onClick={() => handleClick('flip')}
					/>
				}
			/>

			<Popup
				content='Restart the game'
				trigger={
					<Button
						negative
						icon={<FontAwesomeIcon icon={faRepeat} size="2x" />}
						onClick={handleRestore}
					/>
				}
			/>
		</div>
	)
}

const mapStateToProps = ({ board }) => {
	return {
		isFlipped: board.isFlipped,
	}
}

export default connect(mapStateToProps)(FlipBoardButton)
