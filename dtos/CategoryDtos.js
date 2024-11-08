export const ExistingCategoryDto = {
    type: "object",
    properties: {
        id: { type: "number" },
        name: { type: "string" }
    }
}

export const getCategoryDto = {
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
            items: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    name: { type: "string" }
                }
            }
        }
    }
}

export const createCategory = {
    body: {
        type: "object",
        properties: {
            name: { type: "string" }
        },
        required: ["name"]
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: { type: "number" },
                name: { type: "string" }
            }
        }
    }
}

export const getCategoryOfAPostDto = {
    body: {
        type: "object",
        properties: {
            postId: { type: "number" }
        },
        required: ["postId"]
    },
    response: {
        200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "number" },
                    name: { type: "string" }
                }
            }
        }
    }
}


export const updateCategoryDto = {
    params: {
        type: "object",
        properties: {
            id: { type: "number" }
        },
        required: ["id"]
    },
    body: {
        type: "object",
        properties: {
            name: { type: "string" }
        },
        required: ["name"]
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: { type: "number" },
                name: { type: "string" }
            }
        }
    }
}

// dtos/CategoryDtos.js
export const deleteCategoryofAPostDto = {
    params: {
        type: "object",
        properties: {
            id: { type: "number" },
            postId: { type: "number" }
        },
        required: ["id", "postId"]
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: { type: "number" },
                name: { type: "string" }
            }
        }
    }

}