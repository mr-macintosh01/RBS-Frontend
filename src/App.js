import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Analytics from './pages/Analytics'
import Config from './pages/Config'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' index element={<Home />}/>
				<Route path='/analytics' element={<Analytics />}/>
				<Route path='/config' element={<Config />}/>
			</Routes>
		</>
	)
}

export default App;
