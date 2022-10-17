# MySQL 環境構築覚書

ローカルに MySQL 環境(docker コンテナ)を構築する。

## 初回構築手順

1. MySQL コンテナ作成＋起動

```sh
cd mysql
# ローカルに studygql-mysql コンテナが生成される
docker-compose up -d
```

2. コンテナに入り `root` ユーザーで MySQL に接続する(PW: `root`)

```sh
 # MySQLコンテナに入る
 docker-compose exec db bash

 # MySQLにrootユーザーで接続
 mysql -u root -p
```

3. Prisma Migrate で必要なユーザー権限を `dbuser` に付与する

- <small>参考：[Shadow database user permissions](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#shadow-database-user-permissions)</small>

```sql
mysql> grant create, alter, drop, references on *.* to dbuser;
```

4. `dbuser` に権限が付与されたことを確認する

```sql
mysql> show grants for dbuser;
+--------------------------------------------------------------+
| Grants for dbuser@%                                          |
+--------------------------------------------------------------+
| GRANT CREATE, DROP, REFERENCES, ALTER ON *.* TO `dbuser`@`%` |
| GRANT ALL PRIVILEGES ON `studygql`.* TO `dbuser`@`%`         |
+--------------------------------------------------------------+
2 rows in set (0.00 sec)
```

## コンテナ起動/停止/再起動の方法

```sh
# コンテナ起動
docker-compose start

# 停止
docker-compose stop

# 再起動（停止＋起動）
docker-compose restart
```
