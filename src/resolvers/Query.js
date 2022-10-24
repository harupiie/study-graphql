// 第三引数ではcontextオブジェクトからprismaを分割代入
const fetchPosts = (parent, args, { prisma }, info) => {
  return prisma.post.findMany();
};

export default { fetchPosts };
