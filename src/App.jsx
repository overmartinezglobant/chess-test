import { Card } from 'semantic-ui-react'
import { ChessBoard } from './components'
import MoveHistory from './components/MoveHistory/MoveHistory'
import './App.css'
import SidePanel from './components/SidePanel/SidePanel'

function App () {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<h1 style={{ marginTop: '1rem' }}>Chess Board</h1>

			<div className="board-container">
				<div className="board-content">
					<Card fluid>
						<Card.Content>
							<Card.Header>
							Header
							</Card.Header>
						</Card.Content>
						<Card.Content>
							<ChessBoard />
						</Card.Content>
						<Card.Content extra>
							<Card.Header>
							Footer
							</Card.Header>
						</Card.Content>
					</Card>
				</div>
				<SidePanel style={{ marginLeft: '2rem' }} />
			</div>

		</div>
	)
}

export default App
