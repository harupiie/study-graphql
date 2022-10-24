const posts = (parent, args, { prisma }) => {
  // 親のUserスキーマ.idで一意検索
  return prisma.user.findUnique({ where: { id: parent.id } }).posts();
};

export default { posts };
