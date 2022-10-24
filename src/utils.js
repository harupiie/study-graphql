import jwt from "jsonwebtoken";
export const APP_SECRET = "GraphQL-is-aw3some";

// トークンの元情報(ユーザーID)を復元
const getTokenPayload = (token) => {
  return jwt.verify(token, APP_SECRET);
};

// ユーザーIDを取得する
export const getUserId = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("トークンが見つかりません");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }
  throw new Error("ユーザー認証権限がありません");
};
