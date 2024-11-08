const users =[
    {
        id: 1,
        name: 'John Doe',
        mail: 'johndoe@mail.com',
        password: 'password'
    },
    {
        id: 2,
        name: 'Jane Doe',
        mail: 'janedoe@mail.com',
        password: 'password'
    },
    {
        id: 3,
        name: 'John Smith',
        mail: 'johnsmith@mail.com',
        password: 'password'
    },
]

export const userRepository = {
    getUserId: async (id) => {
        const user = users.find((user) => user.id === parseInt(id));
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    },
    createUser: async (user) => {
        const id = users.length + 1;
        const newUser = { id, ...user };
        users.push(newUser);
        return newUser;
    },
    getUserbyMailPwd: async (mail, password) => {
        const user = users.find((user) => user.mail === mail && user.password === password);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}