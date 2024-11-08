export const PublicUserDto = {
    type: "object",
    properties: {
        id: { type: "number" },
        username: { type: "string" }
    },
};

export const GetUserDto = {
    params: {
        type: "object",
        properties: {
            id: { type: "number" }
        },
        required: ["id"]
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: { type: "number" },
                username: { type: "string" },
                mail: { type: "string" }
            },
            required: ["id", "username", "mail"]
        }
    }
}

export const CreateUserDto = {
    body: {
        type: "object",
        properties: {
            username: { type: "string" },
            mail: { type: "string" },
            password: { type: "string" },
        },
        required: ["mail", "username", "password"],
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: { type: "number" },
                username: { type: "string" },
                mail: { type: "string" },
            },
            required: ["id", "username", "mail"],
        },
    },
}

export const LoginUserDto = {
    body: {
        type: "object",
        properties: {
            mail: { type: "string" },
            password: { type: "string" },
        },
        required: ["mail", "password"],
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: { type: "number" },
                username: { type: "string" },
                mail: { type: "string" },
                token: { type: "string" },
            },
            required: ["id", "username", "mail","token"],
        },
    },
}