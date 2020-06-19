import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import {
    //signOutAction,
    signInAction,
    //editProfileStateAction,
    //fetchProductsInCartAction, fetchOrdersHistoryAction,
} from "./action";
import {push} from 'connected-react-router';
import {isValidRequiredInput, isValidEmailFormat} from '../../functions/common';

export const signIn = (email, password) => {
    return async (dispatch) => {
       // dispatch(showLoadingAction("Sign in..."));
        if (!isValidRequiredInput(email, password)) {
            //dispatch(hideLoadingAction());
            alert('メールアドレスかパスワードが未入力です。')
            return false
        }
        if (!isValidEmailFormat(email)) {
           // dispatch(hideLoadingAction());
            alert('メールアドレスの形式が不正です。')
            return false
        }
        return auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const userState = result.user
                if (!userState) {
                    //dispatch(hideLoadingAction());
                    throw new Error('ユーザーIDを取得できません');
                }
                const userId = userState.uid;

                return db.collection('users').doc(userId).get().then(snapshot => {
                    const data = snapshot.data();
                    if (!data) {
                        //dispatch(hideLoadingAction());
                        throw new Error('ユーザーデータが存在しません');
                    }

                    dispatch(signInAction({
                        isSignedIn: true,
                        role: data.role,
                        uid: userId,
                        username: data.username,
                    }))

                    //dispatch(hideLoadingAction());
                    dispatch(push('/'))
                })
            }).catch(() => {
                //dispatch(hideLoadingAction());
            });
    }
};

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validations
        if(!isValidRequiredInput(email, password, confirmPassword)) {
            alert('必須項目が未入力です。')
            return false
        }
        if(!isValidEmailFormat(email)) {
            alert('メールアドレスの形式が不正です。もう1度お試しください。')
            return false
        }
        if (password !== confirmPassword) {
            alert('パスワードが一致しません。もう1度お試しください。')
            return false
        }
        if (password.length < 6) {
            alert('パスワードは6文字以上で入力してください。')
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                //dispatch(showLoadingAction("Sign up..."))
                const user = result.user
                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now();

                    db.collection('users').doc(uid).set({
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    })
                    .then( () => {
                        dispatch(push('/'))
                        //dispatch(hideLoadingAction())
                    })
                }
            }).catch((error) => {
                //dispatch(hideLoadingAction())
                alert('アカウント登録に失敗しました。もう1度お試しください。');
                console.log(error);
                return false;
                // throw new Error(error)
            })
    }
}