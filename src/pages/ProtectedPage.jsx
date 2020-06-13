import React from 'react';
import 'isomorphic-fetch';

function ProtectedPage (props) {
    return <div>
        <h1>I'm protected.</h1>
    </div>
}

export default {
    component: ProtectedPage
};