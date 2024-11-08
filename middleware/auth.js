import { userRepository } from "../repositories/user.js";
import JWT from "jsonwebtoken";

export function registerAuthMiddlewares(fastify) {
    fastify.decorate("authUser", async function (request, reply) {
        const authHeader = request.headers["authorization"];
        if (!authHeader) {
            reply.code(401).send({ message: "No token provided" });
            return;
        }
        const token = authHeader.split(" ")[1];
        try {
            const payload = JWT.verify(token, process.env.JWT_SECRET);
            const user = await userRepository.getUserId(payload.id);
            if (!user) {
                reply.code(401).send({ message: "Invalid token" });
                return;
            }
            request.user = user;
        } catch (err) {
            reply.code(401).send({ message: "Invalid token" });
            return;
        }
    });
}