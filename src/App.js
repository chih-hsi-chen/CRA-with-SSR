import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Home, Posts, Todos, NotFound } from './pages/pages.jsx';
import { Switch, NavLink } from 'react-router-dom';
// import { ReactComponent as Logo } from './logo.svg';
// import cat from './cat.jpg';
// import Header from './components/header.jsx';
// import {
//     ShoppingCartOutlined,
// } from '@material-ui/icons';
// import './App.css';

function App({ route }) {
	return (
		// <div className="App">
		// 	<header className="App-header">
		// 		<Logo className="App-logo" alt="logo" stroke="#DB7290" strokeWidth="1rem"/>
		// 		<img src={cat} style = {{
		// 			"width": "100%",
		// 		}} />
		// 		<ShoppingCartOutlined />
		// 		<p>
		// 			Edit <code>src/App.js</code> and save to reload.
		// 		</p>
		// 		<Header />
		// 		<a
		// 			className="App-link"
		// 			href="https://reactjs.org"
		// 			target="_blank"
		// 			rel="noopener noreferrer"
		// 		>
		// 			Learn React
		// 		</a>
		// 	</header>
		// </div>
		<div>
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/todos">Todos</NavLink>
				</li>
				<li>
					<NavLink to="/posts">Posts</NavLink>
				</li>
			</ul>

			<Switch>
				{renderRoutes(route.routes)}
			</Switch>
		</div>
	);
}

export default App;
