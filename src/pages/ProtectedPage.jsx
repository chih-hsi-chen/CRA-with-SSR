import React from 'react';
import { connect } from "react-redux";
import withAuth from "../components/withAuth";

function ProtectedPage (props) {
    return <div>
        <h1>I'm protected.</h1>
        <h2>{ props.username || 'Stranger' }</h2>
    </div>
}

const mapStateToProps = (state) => ({
    username: state.auth.username
})

ProtectedPage = withAuth(connect(mapStateToProps)(ProtectedPage));

export default {
    component: ProtectedPage
};