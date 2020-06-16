import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { validateAuth } from "../actions/auth";
import LoadingIndicator from "./LoadingIndicator";

export default function withAuth(WrappedComponent) {
    const AuthComponent = class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                isLoading: !(props.isAuthed && props.isServerControl)
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
            const { isAuthed, ...rest } = this.props;
            const { isLoading } = this.state;
            return (
                isLoading
                ? <LoadingIndicator /> 
                : isAuthed
                ? <WrappedComponent {...rest} />
                : <Redirect to={{ pathname: '/login' }} from={this.props.location.pathname} />
            );
        }
    };

    const mapStateToProps = state => ({
        isAuthed: state.auth.isAuthed,
        isServerControl: state.auth.isServerControl,
    });
    
    const mapDispatchToProps = {
        validateAuth
    };

    return connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
}