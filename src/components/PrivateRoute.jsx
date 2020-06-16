import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import { validateAuth } from "../actions/auth";

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    async componentDidMount() {
        const { validateAuth } = this.props;

        if(this.state.isLoading) {
            await validateAuth();
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        const { routeComponent: RouteComponent, isAuthed, ...rest } = this.props;
        const { isLoading } = this.state;
        return (
            isLoading
            ? <LoadingIndicator /> 
            : <Route {...rest} render={ props => (
                isAuthed
                ? <RouteComponent {...props} />
                : <Redirect to={{ pathname: '/login' }} from={props.location} />
            )} />
        );
    }
}

const mapStateToProps = state => ({
    isAuthed: state.auth.isAuthed
});

const mapDispatchToProps = {
    validateAuth
};
 
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);