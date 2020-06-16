import React, {useState} from 'react';
import 'isomorphic-fetch';

function Login(props) {
    const [username, writename] = useState('');
    const [password, writeword] = useState('');

    function onSubmit(username, password) {
        const fetchOpt = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };
    
        fetch('http://localhost:3000/api/login', fetchOpt)
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            });
    }

    return <div>
        <input type="text" name='username' value={username} onChange={e => writename(e.target.value)} />
        <input type="password" name='password' value={password} onChange={e => writeword(e.target.value)} />
        <button onClick={() => onSubmit(username, password)}>submit</button>
    </div>
}

export default {
    component: Login,
};