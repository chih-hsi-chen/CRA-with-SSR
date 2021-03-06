import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { doLogin } from '../helpers/api';

function Login(props) {
    const [username, writename] = useState('');
    const [password, writeword] = useState('');
    const history = useHistory();

    function onSubmit(username, password) {    
        doLogin(username, password)
        .then(res => {
            const nextPage = props.from || '/';
            history.replace(nextPage);
        })
        .catch(err => {
            console.error(err);
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