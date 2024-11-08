import { userRepository } from "../repositories/user.js";
import { CreateUserDto, GetUserDto,LoginUserDto } from "../dtos/UserDtos.js";
import JWT from "jsonwebtoken"
import {createHash} from "crypto";

export function registerAuthRoutes(fastify) {
  fastify.post("/signup",{schema:CreateUserDto}, async function signup(request, reply) {
    //register a user
    const user = request.body;
    user.password = createHash("sha1")
    .update(user.password+process.env.PASSWORD_SALT)
    .digest("hex");
    return await userRepository.createUser(user);

  });
  fastify.post("/login",{schema:LoginUserDto}, async function login(request, reply) {
    //get user by email and password
    const mail = request.body.mail;
    const password = createHash("sha1").update(request.body.password+process.env.PASSWORD_SALT).digest("hex");
    const user = await userRepository.getUserbyMailPwd(mail, password);
    if(!user){
      throw new Error("Invalid credentials");
    }
    user.token = JWT.sign({id:user.id}, process.env.JWT_SECRET);
    return user
  });

  fastify.get("/users/:id",{schema:GetUserDto}, async function getUser(request, reply) {
    //get user by id
    const id = parseInt(request.params.id);
    return userRepository.getUserId(id);
  });

}


