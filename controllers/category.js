import { createCategory, deleteCategoryofAPostDto, getCategoryDto, updateCategoryDto } from '../dtos/CategoryDtos.js';
import { categoryRepository } from '../repositories/category.js';

export function registerCategoryRoutes(fastify) {
    fastify.get("/category", { schema: getCategoryDto }, async function getCategory(request, reply) {
        //TODO return list of category
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        return await categoryRepository.getCategory(page, limit);
    });
    fastify.get("/category/:id", async function getCategoryOfAPost(request, reply) {
        //TODO return category of a post 
        const id = parseInt(request.params.id);
        return await categoryRepository.getCategoryOfAPost(id);
    })
    fastify.post("/category", { schema: createCategory }, async function createCategory(request, reply) {
        //TODO create a category
        const category = request.body;
        return await categoryRepository.createCategory(category);
    })
    fastify.put("/category/:id", { schema: updateCategoryDto }, async function updateCategory(request, reply) {
        //TODO update category by id
        const id = parseInt(request.params.id);
        const body = request.body;
        return await categoryRepository.updateCategory(id, body);
    })
    fastify.delete("/category/:id/:postId", { schema: deleteCategoryofAPostDto }, async function deleteCategoryOfAPost(request, reply) {
        //deleteCategoryOfAPostBy id of the category and the post
        const id = parseInt(request.params.id);
        const postId = parseInt(request.params.postId);
        return await categoryRepository.deleteCategoryOfAPostByID(postId, id);

    })

}