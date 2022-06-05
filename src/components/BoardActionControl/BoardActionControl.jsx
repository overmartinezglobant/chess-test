import { faChessKing } from '@fortawesome/free-regular-svg-icons'
import {
	faArrowLeft,
	faArrowRight,
	faChessKing as faChessKingSolid,
	faRepeat,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch } from 'react-redux'
import { Button, Divider, Popup } from 'semantic-ui-react'
import { resetBoard, resetHistory, setBoardState, setCurrentMove, setFlippedBoard, switchNextPlayer } from '../../../redux/reducers/board'
import './BoardActionControl.css'

const BoardActionControl = ({ isFlipped, currentMove, history }) => {
	const dispatch = useDispatch()

	const handleClick = (type) => {
		dispatch(setFlippedBoard(type === 'flip'))
	}

	const handleRestore = () => {
		dispatch(resetBoard())
		dispatch(resetHistory())
		dispatch(switchNextPlayer('b'))
	}

	const isDisabled = () => {
		return (currentMove === -1 && !history.length) || currentMove === history.length - 1
	}

	const moveForward = () => {
		if (!isDisabled()) {
			const value = currentMove + 1
			const { board, team } = history[value]

			dispatch(switchNextPlayer(team))
			dispatch(setCurrentMove(value))
			dispatch(setBoardState(board))

			return true
		}

		console.log('isDisables')
		return false
	}

	const moveBackward = () => {
		if (currentMove !== -1) {
			if (currentMove === 0) {
				dispatch(setCurrentMove(-1))
				dispatch(switchNextPlayer('b'))
				dispatch(resetBoard())

				return true
			}

			const value = currentMove - 1
			const { board, team } = history[value]

			dispatch(switchNextPlayer(team))
			dispatch(setCurrentMove(value))
			dispatch(setBoardState(board))

			return true
		}

		return false
	}

	const movementButtons = [
		{
			disabled: currentMove === -1,
			icon: faArrowLeft,
			onClick: moveBackward,
		},
		{
			disabled: isDisabled(),
			icon: faArrowRight,
			onClick: moveForward,
		},
		{
			icon: faRepeat,
			onClick: handleRestore,
			negative: true,
		},
	]

	const flipActions = [
		{
			icon: faChessKing,
			primary: isFlipped === false,
			basic: true,
			onClick: () => handleClick('normal'),
			content: 'Play with white pieces',
		},
		{
			icon: faChessKingSolid,
			primary: isFlipped,
			basic: true,
			onClick: () => handleClick('flip'),
			content: 'Play with black pieces',
		},
	]

	return (
		<div className="flip-board-button">
			<div>
				<div
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{movementButtons.map(({ icon, onClick, ...props }, index) => {
						return (
							<Button size="small" key={`mv-action-btn-${index}`} {...props} onClick={onClick}>
								<FontAwesomeIcon icon={icon} />
							</Button>
						)
					})}
				</div>
			</div>

			<Divider inverted />

			<div
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{flipActions
					.map(({ icon, onClick, content, ...props }, index) => {
						return (
							<Popup
								key={`flip-action-btn-${index}`}
								content={content}
								trigger={
									<Button
										size="small"
										onClick={onClick}
										icon={
											<FontAwesomeIcon
												icon={icon}
												size='lg'
											/>
										}
										{...props}
									/>
								}
							/>
						)
					})}
			</div>
		</div>
	)
}

const mapStateToProps = ({ board }) => {
	return {
		isFlipped: board.isFlipped,
		currentMove: board.currentMove,
		history: board.history,
	}
}

export default connect(mapStateToProps)(BoardActionControl)
