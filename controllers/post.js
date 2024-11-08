import { postRepository } from "../repositories/post.js";
import { CreatePostDto, GetPostsDto, GetPostDto, DeletePostDto, UpdatePostDto } from "../dtos/PostDtos.js";
import { UnauthorizedError } from "../utils/errors.js";

export function registerPostRoutes(fastify) {
  fastify.get("/posts", { schema: GetPostsDto }, async function getPosts(request, reply) {
    //TODO return list of posts
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    return await postRepository.getPosts(page, limit);
  });
  fastify.get("/posts/:id", { schema: GetPostDto }, async function getPosts(request, reply) {
    //TODO return post by id
    const id = parseInt(request.params.id);
    return await postRepository.getPost(id);
  });

  fastify.post("/posts", { preHandler: fastify.auth([fastify.authUser]), schema: CreatePostDto }, async function createPost(request, reply) {
    const { title, content, category } = request.body;
    const authorId = request.user.id;

    // Créer le post
    const post = await postRepository.createPost({ title, content, authorId });

    // Associer les catégories au post
    if (category && category.length >= 0) {
      for (const categories of category) {
        console.error(post.id);
        console.error(categories.id);

        await postRepository.addCategoryToPost(post.id, categories.id);
      }
    }
    const postWithCategories = await postRepository.getPost(post.id);

    return postWithCategories;
  });
  fastify.put("/posts/:id", { preHandler: fastify.auth([fastify.authUser]), schema: UpdatePostDto }, async function updatePost(request, reply) {
    //TODO update post by id
    const id = parseInt(request.params.id);
    const body = request.body;
    const authUser = request.user;
    const existingPost = await postRepository.getPost(id);
    if (authUser.id !== existingPost.authorId) {
      throw new UnauthorizedError("You are not allowed to update this post");
    }
    return await postRepository.updatePost(id, body);
  });
  fastify.delete("/posts/:id", { preHandler: fastify.auth([fastify.authUser]), schema: DeletePostDto }, async function deletePost(request, reply) {
    //TODO delete post by id
    const id = parseInt(request.params.id);
    const authUser = request.user;
    const authorId = (await postRepository.getPost(id)).authorId;
    if (authUser.id !== authorId) {
      throw new UnauthorizedError("You are not allowed to delete this post");
    }
    return await postRepository.deletePost(id);

  });
}
