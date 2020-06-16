import React from 'react';
import withAuth from "../components/withAuth";

function ProtectedPage (props) {
    return <div>
        <h1>I'm protected.</h1>
    </div>
}

ProtectedPage = withAuth(ProtectedPage);

export default {
    component: ProtectedPage
};