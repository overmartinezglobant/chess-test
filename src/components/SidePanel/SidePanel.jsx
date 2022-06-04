import { Card } from 'semantic-ui-react'
import FlipBoardButton from '../FlipBoardButton/FlipBoardButton'
import MoveHistory from '../MoveHistory/MoveHistory'

const SidePanel = ({ style = {} }) => {
	return (
		<div className="side-panel">
			<Card
				style={{
					margin: '0',
					maxHeight: '100%',
					height: '100%',
					overflow: 'auto',
					...style,
				}}
			>
				<Card.Content>
					<MoveHistory />
				</Card.Content>
				<Card.Content extra>
					<FlipBoardButton />
				</Card.Content>
			</Card>
		</div>
	)
}

export default SidePanel
