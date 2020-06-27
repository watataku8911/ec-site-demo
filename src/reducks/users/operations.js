import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import {
    signOutAction,
    signInAction,
    //editProfileStateAction,
    //fetchProductsInCartAction, fetchOrdersHistoryAction,
} from "./action";
import {push} from 'connected-react-router';
import {isValidRequiredInput, isValidEmailFormat} from '../../functions/common';


export const resetPassword = (email) => {
    return async (dispatch) => {
        if (!isValidEmailFormat(email)) {
            alert('メールアドレスの形式が不正です。')
            return false
        } else {
            return auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレス宛にパスワードリセットのメールをお送りしましたのでご確認ください。')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('登録されていないメールアドレスです。もう一度ご確認ください。')
                })
        }
    }
};

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                db.collection("users").doc(user.uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()
                        if (!data) {
                            throw new Error('ユーザーデータが存在しません。')
                        }

                        // Update logged in user state
                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: user.uid,
                            username: data.username,
                        }))
                    })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
};

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
};

export const signOut = () => {
    return async (dispatch, getState) => {
        //dispatch(showLoadingAction("Sign out..."));
        //const uid = getState().users.uid

        // Delete products from the user's cart
        // await usersRef.doc(uid).collection('cart').get()
        //     .then(snapshots => {
        //         snapshots.forEach(snapshot => {
        //             usersRef.doc(uid).collection('cart').doc(snapshot.id).delete()
        //         })
        //     });

        // Sign out with Firebase Authentication
        auth.signOut().then(() => {
            dispatch(signOutAction());
            // dispatch(initProductsAction())
            // dispatch(hideLoadingAction());
            dispatch(push('/signin'));
        }).catch(() => {
            //dispatch(hideLoadingAction());
            throw new Error('ログアウトに失敗しました。')
        })
    }
};