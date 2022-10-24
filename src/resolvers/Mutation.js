import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils.js";

// サインアップ
const signup = async (parent, args, { prisma }, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

// ログイン
const login = async (parent, args, { prisma }, info) => {
  const user = await prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("ユーザーが存在しません");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("無効なパスワードです");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
};

// 投稿
const createPost = async (parent, args, { prisma, userId, pubsub }, info) => {
  const newPost = await prisma.post.create({
    data: {
      body: args.body,
      createdBy: { connect: { id: userId } },
    },
  });
  pubsub.publish("NEW_POST", newPost);

  return newPost;
};

// いいね
const addLike = async (parent, args, { prisma, userId, pubsub }, info) => {
  const like = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId: Number(args.postId),
        userId: userId,
      },
    },
  });
  if (Boolean(like)) {
    throw new Error(`その投稿にはすでにいいねしています: ${args.postId}`);
  }

  const newLike = prisma.like.create({
    data: {
      user: { connect: { id: userId } },
      post: { connect: { id: Number(args.postId) } },
    },
  });
  pubsub.publish("NEW_LIKE", newLike);

  return newLike;
};

export default { signup, login, createPost, addLike };
