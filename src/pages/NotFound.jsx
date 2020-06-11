import React from 'react';

function NotFound(props) {
    let { staticContext = {} } = props;

    staticContext.status = 404;

    return <div>No this page.</div>
}

export default NotFound;