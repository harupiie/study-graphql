const createdBy = (parent, args, { prisma }) => {
  // 親のPostスキーマ.idで一意検索
  return prisma.post.findUnique({ where: { id: parent.id } }).createdBy();
};

const likes = (parent, args, { prisma }) => {
  // 親のPostスキーマ.idで一意検索
  return prisma.post.findUnique({ where: { id: parent.id } }).likes();
};

export default { createdBy, likes };
