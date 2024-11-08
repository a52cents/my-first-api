const posts = [
  {
    id: 1,
    title: "Post 1",
    content: "This is post 1",
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is post 2",
  },
  {
    id: 3,
    title: "Post 3",
    content: "This is post 3",
  },
];
//export post in const postRepository
export const postRepository = {
  getPosts: async (page, limit) => {
    const start = (page - 1) * limit;
    const end = page * limit;
    return posts.slice(start, end);
  },
  getPost: async (id) => {
    const post = posts.find((post) => post.id === parseInt(id));
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  },
  createPost: async (post) => {
    const id = posts.length + 1;
    const newPost = { id, ...post };
    posts.push(newPost);
    return newPost;
  },
  updatePost: async (id, post) => {
    const oldPost = posts.find((post) => post.id === parseInt(id));
    const index = posts.findIndex((post) => post.id === parseInt(id));
    if (!oldPost) {
      throw new Error("Post not found");
    }
    const newPost = { id, ...oldPost, ...post };
    posts[index] = newPost;
    return newPost;
  },
  deletePost: async (id) => {
    const index = posts.findIndex((post) => post.id === parseInt(id));
    if (index === -1) {
      throw new Error("Post not found");
    }
    const deleted = posts.splice(index, 1);
    return deleted;
  },
};
