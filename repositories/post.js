import { prisma } from "../services/db.js";
import { NotFoundError, UnauthorizedError } from "../utils/errors.js";
//export post in const postRepository
export const postRepository = {
  getPosts: async (page, limit) => {
    const post = await prisma.posts.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: true,
        category: {
          include: { category: true }
        }
      },
    });
    return post;
  },
  getPost: async (id) => {
    const post = await prisma.posts.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        category: {
          include: { category: true }
        }
      },

    });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return post;
  },
  createPost: async (post) => {
    const newPost = await prisma.posts.create({
      data: post,
      include: { author: true },
      include: { category: true }
    });
    return newPost;
  },
  addCategoryToPost: async (postId, categoryId) => {
    await prisma.categoriesOnPosts.create({
      data: {
        postId: postId,
        categoryId: categoryId
      }
    })
  },
  updatePost: async (id, post) => {
    const oldPost = await prisma.posts.findUnique({
      where: {
        id: id,
      },
    });
    if (!oldPost) {
      throw new NotFoundError("Post not found");
    }

    const updatedPost = await prisma.posts.update({
      where: {
        id: id,
      },
      data: post,
      include: {
        author: true,
        category: {
          include: { category: true }
        }
      },
    });
    return updatedPost;
  },
  deletePost: async (id) => {
    const post = await prisma.posts.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        category: {
          include: { category: true }
        }
      },
    });
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    const deletedPost = await prisma.posts.delete({
      where: {
        id: id,
      },
    });
    return deletedPost;
  }
};
