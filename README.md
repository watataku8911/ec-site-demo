# ec-site-demo
> React + Redux/Firebaseで作成したECサイトです。


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
