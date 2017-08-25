GCP Pub/Subを使ってGCFからメール送信する仕組み
==================================

## これ何

Golangアプリケーションが、GCP Pub/Subに対してPublishを行い
GCP Cloud Functionsが、Subscriberとして、メッセージを受けて、メールテンプレートに展開した後、SendGrid経由でメールを送信する一連の流れ

## Usage

### Golang Application

```
$ go run main.go --project hoge
```

### Cloud Functions

```
$ make deploy
```