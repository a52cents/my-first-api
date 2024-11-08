import {expect,test } from 'vitest'
import got from 'got'

const client = got.extend({
    prefixUrl: 'http://localhost:3000/',
    responseType: 'json',
    throwHttpErrors: false,
})
const d = new Date()
const mail =`johndoes${d}@mail.com`

test('[VALID] POST /signup', async () => {
    
    const res = await client.post('signup', {
        json: {
            mail: mail,
            username: 'johns',
            password: 'password',
        },
        responseType: 'json',
    })
    const data = res.body
    expect(res.statusCode).toBe(200)
    expect(data).toHaveProperty('id')
    expect(data.mail).toBe(mail)
    expect(data).to.not.have.property('password')
})

test('[Valid] POST /login', async () => {
    const res = await client.post('login', {
        json: {
            mail: mail,
            password: 'password',
        },
        responseType: 'json',
    })
    const data = res.body
    expect(res.statusCode).toBe(200)
    expect(data).toHaveProperty('id')
    expect(data.mail).toBe(mail)
    expect(data).to.not.have.property('password')
    expect(data).toHaveProperty('token')
})

test('[Valid] GET /users/:id', async () => {
    const res = await client.post('login', {
        json: {
            mail: mail,
            password: 'password',
        },
        responseType: 'json',
    })
    const data = res.body
    expect(res.statusCode).toBe(200)
    expect(data).toHaveProperty('id')
    expect(data.mail).toBe(mail)
    expect(data).to.not.have.property('password')
    expect(data).toHaveProperty('token')
    const res2 = await client.get(`users/${data.id}`)
    const data2 = res2.body
    expect(res2.statusCode).toBe(200)
    expect(data2).toHaveProperty('id')
    expect(data2.mail).toBe(mail)
    expect(data2).to.not.have.property('password')
    expect(data2).to.not.have.property('token')
})

test('[VALID] POST /login and create post', async () => {
    // Effectuez une requête de connexion pour obtenir le token
    const loginRes = await client.post('login', {
        json: {
            mail: mail,
            password: 'password',
        },
        responseType: 'json',
    });
    const loginData = loginRes.body;
    const token = loginData.token;

    // Vérifiez que le token est présent
    expect(token).toBeDefined();

    // Utilisez le token dans les en-têtes de la requête pour créer un post
    const postRes = await client.post('posts', {
        json: {
            title: 'My first post',
            content: 'This is my first post',
            category: []
        },
        headers: {
            Authorization: `Bearer ${token}`
        },
        responseType: 'json',
    });

    const postData = postRes.body;
    expect(postRes.statusCode).toBe(200);
    expect(postData).toHaveProperty('id');
    expect(postData.title).toBe('My first post');
    expect(postData.content).toBe('This is my first post');
});