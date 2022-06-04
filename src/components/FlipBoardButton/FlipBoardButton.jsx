import { faChessKing } from '@fortawesome/free-regular-svg-icons'
import {
	faArrowLeft,
	faArrowRight,
	faChessKing as faChessKingSolid,
	faPlay,
	faRepeat,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch } from 'react-redux'
import { Button, Divider, Popup } from 'semantic-ui-react'
import { resetBoard, setFlippedBoard, switchNextPlayer } from '../../../redux/reducers/board'
import './FlipBoardButton.css'

const FlipBoardButton = ({ isFlipped }) => {
	const dispatch = useDispatch()

	const handleClick = (type) => {
		dispatch(setFlippedBoard(type === 'flip'))
	}

	const handleRestore = () => {
		console.log('.')
		dispatch(resetBoard())
		dispatch(switchNextPlayer('b'))
	}

	const movementButtons = [
		{
			icon: faArrowLeft,
			onClick: () => null,
		},
		{
			icon: faPlay,
			onClick: () => null,
		},
		{
			icon: faArrowRight,
			onClick: () => null,
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
							<Button size="small" key={`mv-action-btn-${index}`} {...props}>
								<FontAwesomeIcon icon={icon} onClick={onClick} />
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
										icon={
											<FontAwesomeIcon
												icon={icon}
												size='lg'
												onClick={onClick}
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
	}
}

export default connect(mapStateToProps)(FlipBoardButton)
