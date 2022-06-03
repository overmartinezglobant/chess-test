import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import store from '../redux/store'
import { Provider } from 'react-redux'

const ele = document.getElementById('root')

ReactDOM.createRoot(ele).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
)
