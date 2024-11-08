import { prisma } from "../services/db.js";
import { NotFoundError, UnauthorizedError } from "../utils/errors.js";
export const categoryRepository = {
    getCategory: async (page, limit) => {
        const category = await prisma.category.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return category;
    },

    createCategory: async (category) => {
        const newCategory = await prisma.category.create({
            data: category,
        });
        return newCategory;
    },
    getCategoryOfAPost: async (postId) => {
        const category = await prisma.category.findMany({
            where: {
                posts: {
                    some: {
                        postId: postId,
                    },
                },
            },
        });
        return category;
    },
    updateCategory: async (id, category) => {
        const updatedCategory = await prisma.category.update({
            where: {
                id: id,
            },
            data: category,
        });
        return updatedCategory;
    },
    deleteCategory: async (id) => {
        const deletedCategory = await prisma.category.delete({
            where: {
                id: id,
            },
        });
        return deletedCategory;
    },
    deleteCategoryOfAPostByID: async (postId, categoryId) => {
        const deletedCategory = await prisma.categoriesOnPosts.deleteMany({
            where: {
                postId: postId,
                categoryId: categoryId
            }
        });
        return deletedCategory;
    },
}