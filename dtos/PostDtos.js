import { PublicUserDto } from "./UserDtos.js";
import { ExistingCategoryDto } from "./CategoryDtos.js";
const ExistingPostDto = {
    type: "object",
    properties: {
        id: { type: "number" },
        title: { type: "string" },
        content: { type: "string" },
        author: PublicUserDto,
        category: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    category : ExistingCategoryDto
                }
            }
        }
    },
    required: ["id", "title", "content", "authorId"],
};

export const CreatePostDto = {
    security: [{ token: [] }],
    body: {
        type: "object",
        properties: {
            title: { type: "string" },
            content: { type: "string" },
            category: {
                type: "array",
                items: ExistingCategoryDto
            }
        },
        required: ["title", "content"],
    },
    response: {
        200: ExistingPostDto,
    },
};

export const GetPostsDto = {
    querystring: {
        type: "object",
        properties: {
            page: { type: "number" },
            limit: { type: "number" }
        },
        required: [""]
    },
    response: {
        200: {
            type: "array",
            items: ExistingPostDto
        }
    }
}

export const GetPostDto = {
    params: {
        type: "object",
        properties: {
            id: { type: "number" }
        },
        required: ["id"]
    },
    response: {
        200: ExistingPostDto
    }
}

export const DeletePostDto = {
    security: [{ token: [] }],
    params: {
        type: "object",
        properties: {
            id: { type: "number" }
        },
    },
    response: {
        200: ExistingPostDto
    }
}

export const UpdatePostDto = {
    security: [{ token: [] }],
    params: {
        type: "object",
        properties: {
            id: { type: "number" }
        },
    },
    body: {
        type: "object",
        properties: {
            title: { type: "string" },
            content: { type: "string" },
        },

    },
    response: {
        200: ExistingPostDto
    },
}