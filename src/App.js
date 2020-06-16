import React from 'react';
import { connect } from "react-redux";
import renderRoutes from './helpers/renderRouteCustom';
import { Switch, NavLink } from 'react-router-dom';
import { recognizeServer } from "./actions/auth";
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		this.props.recognizeServer();
	}

	render() {
		const { route } = this.props;

		return (
			<div>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/login">Login</NavLink>
					</li>
					<li>
						<NavLink to="/protected">Protected</NavLink>
					</li>
				</ul>
				<Switch>
					{renderRoutes(route.routes)}
				</Switch>
			</div>
		);
	}
}

const mapDispatchToProps = {
	recognizeServer
};

export default connect(null, mapDispatchToProps)(App);