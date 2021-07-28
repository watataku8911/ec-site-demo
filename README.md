# ec-site-demo
> I made ec-site using for React + Redux/Firebase

## Create development environment
### Execute CRA(create-react-app)
```
npx create-react-app ec-app
```
### Configure Firebase Project
- SignIn to your google account
```
fireabase login
```
- Init your local environment to connect Firebase project
```
firebase init
```

### Install npm packages
- Install react, redux, firebase, material-ui packages
```
npm install --save @material-ui/core @material-ui/icons @material-ui/styles connected-react-router firebase history react-redux react-router redux redux-actions redux-logger redux-thunk reselect
```










## ログイン

- メールアドレス:hogehoge@gmail.com
- パスワード:Passw0rd

## アプリURL
- [https://ec-site-43a04.web.app](https://ec-site-43a04.web.app)

## 機能一覧
- ユーザ登録
- ユーザ認証
- 商品情報登録(管理者のみ)
- 商品情報編集(管理者のみ)
- 商品情報削除(管理者のみ)
- 商品情報閲覧
- カート機能
- 注文
- 注文履歴

## 現在取り組んでいるコト
- stripeを使った決済機能
- algoliaを使ったキーワード検索

## 苦労した点
- historyによるバグ

connect-react-routerが上手くいかない

> インストール時のライブラリ「history」のバージョンを**5.0.0**を**4.10.1**に
バージョンを落としてやると何故か上手くいった。

```
$ npm install history @4.10.1
```
