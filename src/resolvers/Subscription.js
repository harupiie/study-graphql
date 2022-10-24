const newPostSubscribe = (parent, args, { pubsub }, info) => {
  // イベントデータをクライアントにpushする
  return pubsub.asyncIterator("NEW_POST");
};

const newPost = {
  subscribe: newPostSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

const newLikeSubscribe = (parent, args, { pubsub }, info) => {
  return pubsub.asyncIterator("NEW_LIKE");
};

const newLike = {
  subscribe: newLikeSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

export default { newPost, newLike };
