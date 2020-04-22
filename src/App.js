import React from 'react';
import { ReactComponent as Logo } from './logo.svg';
import cat from './cat.jpg';
import Header from './components/header.jsx';
import {
    ShoppingCartOutlined,
} from '@material-ui/icons';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Logo className="App-logo" alt="logo" stroke="#DB7290" strokeWidth="1rem"/>
				<img src={cat} />
				<ShoppingCartOutlined />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<Header />
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
