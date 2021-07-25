import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextInput} from "../conpoments/UIKit";
import {useDispatch} from "react-redux";
import {signIn} from "../reducks/users/operations";
import {push} from 'connected-react-router';

const SignUp = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("hogehoge@gmail.com")
    const [password, setPassword] = useState("Passw0rd")

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[setEmail]);

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    },[setPassword]);


    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">サインイン</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード（半角英数字で6文字以上）"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"Sign in"}
                    onClick={() => dispatch(signIn(email, password))}
                />
                <div className="module-spacer--small" />
                <p className="u-text-small"　onClick={() => dispatch(push("/signup"))}>アカウントをお持ちでない方はこちら</p>
                <div className="module-spacer--small" />
                <p className="u-text-small"　onClick={() => dispatch(push("/signin/reset"))}>パスワードを忘れた方はこちら</p>
            </div>
        </div>
    );
};

export default SignUp;