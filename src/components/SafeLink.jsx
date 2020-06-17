import React from 'react';
import { NavLink, withRouter } from "react-router-dom";

class SafeLink extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();

        if(this.props.to === this.props.history.location.pathname) {
            e.preventDefault();
        }
        if(this.props.onClick)
            this.props.onClick();
    }

    render() {
        const {
            onClick,
            staticContext,
            children,
            history,
            location,
            match,
            ...rest } = this.props;
        return <NavLink onClick={this.handleClick} {...rest}>{children}</NavLink>
    }
}
 
export default withRouter(SafeLink);