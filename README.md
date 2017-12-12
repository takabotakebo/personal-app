#Personal-app

##動作環境

- Node.js v8.4.0
- npm v5.3.0
- MySQL 5.7.19
- TouchDesigner
- Arduino


##フォルダ構成

```bash
personal-app(名前は自由に)       <= サーバー用ソフトウェア
 ├ app.js					   <= サーバ ├ public					   <= データ置き場
 ├ routes					   <= ルーティング
 ├ views					   <= 管理画面のビュー
 ├ mysqlConnection.js		   <= MySQLの設定ファイル
 ├ bin					 ├ package.json				   <= パッケージ管理
 └ package-lock.json


```

##導入方法

クローン後

```bash
# backend 直下で

$ npm install                //モジュールのインストール
$ npm install -g nodemon     //管理画面の起動にnodemon使用するので必要なら

```

MySQLをインストールしデータベースpersonalappを作成<br>
以下の構文を実行

```

CREATE TABLE `personaldatas` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `gender` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `born_y` int(11) DEFAULT NULL,
  `born_m` int(11) DEFAULT NULL,
  `born_d` int(11) DEFAULT NULL,
  `name_first` text,
  `name_family` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;


```


##起動方法

###本番実行

```bash
# ディレクトリ直下で
$ nodemon (ディレクトリ名)

```
