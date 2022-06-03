import { ChessBoard } from './components'

function App () {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<h1 style={{ marginBottom: '1rem', marginTop: '1rem' }}>Chess Board</h1>
			<ChessBoard />
		</div>
	)
}

export default App
