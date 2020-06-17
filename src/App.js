import React from 'react';
import { connect } from "react-redux";
import renderRoutes from './helpers/renderRouteCustom';
import { Switch, NavLink } from 'react-router-dom';
import SafeLink from "./components/SafeLink";
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
						<SafeLink to="/">Home</SafeLink>
					</li>
					<li>
						<SafeLink to="/login">Login</SafeLink>
					</li>
					<li>
						<SafeLink to="/register">Signup</SafeLink>
					</li>
					<li>
						<SafeLink to="/protected">Protected</SafeLink>
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