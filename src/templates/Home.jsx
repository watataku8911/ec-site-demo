import React from 'react';
import {getUserId, getUsername} from '../reducks/users/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {signOut} from '../reducks/users/operations';

const Home = () => {
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const username = getUsername(selector);

    const dispatch = useDispatch();

    return (
        <div>
            <h2>ホーム</h2>
            <p>{uid}</p>
            <p>{username}</p>
            <button onClick={() => dispatch(signOut())}>サインアウト</button>
        </div>
    )
}

export default Home