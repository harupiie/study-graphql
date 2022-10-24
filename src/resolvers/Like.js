const post = (parent, args, { prisma }) => {
  // 親のLikeスキーマ.idで一意検索
  return prisma.like.findUnique({ where: { id: parent.id } }).post();
};

const user = (parent, args, { prisma }) => {
  // 親のLikeスキーマ.idで一意検索
  return prisma.like.findUnique({ where: { id: parent.id } }).user();
};

export default { post, user };
