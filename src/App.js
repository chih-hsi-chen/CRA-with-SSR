import React, { useState, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch, NavLink } from 'react-router-dom';
// import { ReactComponent as Logo } from './logo.svg';
// import cat from './cat.jpg';
// import Header from './components/header.jsx';
// import {
//     ShoppingCartOutlined,
// } from '@material-ui/icons';
import './App.css';

function App({ staticContext = {}, route }) {

	return (
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
