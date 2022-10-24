# study-graphql

GraphQL 学習リポジトリ

# ブランチ説明

- `master` ： ApolloServer + GraphQL のテンプレートブランチ。作業ブランチを切る際は本ブランチから作成する。

# データモデル定義

## 備考

- 以下 entity の `*` 付の field は relation の定義を示す。

## entity `Post`

| field       | fieldtype | attributes                                         |
| ----------- | --------- | -------------------------------------------------- |
| id          | Int       | @id @default(autoincrement())                      |
| body        | String    |                                                    |
| \*createdBy | User?     | @relation(fields: [createdById], references: [id]) |
| createdById | Int?　    |                                                    |
| createdAt   | DateTime  | @default(now())                                    |
| likes       | Like[]    |                                                    |

## entity `User`

| field    | fieldtype | attributes                    |
| -------- | --------- | ----------------------------- |
| id       | Int       | @id @default(autoincrement()) |
| name     | String    |                               |
| email    | String    | @unique                       |
| password | String    |                               |
| posts    | Post[]    |                               |
| likes    | Like[]    |                               |

### entity `Like`

| field  | fieldtype | attributes                                    |
| ------ | --------- | --------------------------------------------- |
| id     | Int       | @id @default(autoincrement())                 |
| \*post | Post      | @relation(fields: [postId], references: [id]) |
| postId | Int       |                                               |
| \*user | User      | @relation(fields: [userId], references: [id]) |
| userId | Int       |                                               |

- その他制約：@@unique([postId, userId])

# 実装手順

1. Prisma スキーマ (`./prisma/schema.prisma`) を定義する。
2. マイグレーションを実行する。参考参照。
   <br />
   <small>参考：[Guides / Database guides /
   Developing with Prisma Migrate](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate)</small>

```sh
cd studypf-graphql
npx prisma migrate dev --name {ファイル名を入力}
```

3. Prisma クライアントを生成する。

```sh
cd studypf-graphql
npx prisma generate
```

4. GraphQL スキーマ (`./schema.graphql`) を定義する。
5. 定義した GraphQL スキーマに対応するリゾルバー (`./resolovers/Xxx.js`) 定義する。
6. Apollo Server を起動すると、
   http://localhost:4000/ にて GraphQL PlayGround を実行可能。

```sh
cd studypf-graphql
node ./src/server.js
```
