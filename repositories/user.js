import { prisma } from "../services/db.js";
import { NotFoundError } from "../utils/errors.js";

export const userRepository = {
    getUserId: async (id) => {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    },
    createUser: async (user) => {
        const newUser = await prisma.user.create({
            data: user
        });
        return newUser;
    },
    getUserbyMailPwd: async (mail, password) => {
        const user = await prisma.user.findFirst({
            where: {
                mail: mail,
                password: password
            }
        });
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    }
}