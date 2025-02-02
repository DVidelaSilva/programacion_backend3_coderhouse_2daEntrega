import Mocha from 'mocha'
import * as chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'

const expect = chai.expect
const requester = supertest('http://localhost:8080')



describe('Testing de Users ', () => {

    describe('Test de Users POST', () => {

        it('El endpoint POST /users debe devolver un 400 al intentar crear un usuario sin pasarle uno de los campos', async () => {
            const mockUser = {
                last_name: "Videla",
                email: "diegoTest@mail.com",
                password: "123456"       
            }
            const{ statusCode, ok, _body} = await requester.post('/users').send(mockUser)
            expect(statusCode).to.be.equal(400)
        })

        it('El endpoint POST /users debe crear un usuario correctamente', async () => {
            const mockUser = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest@mail.com",
                password: "123456"       
            }
            const{ statusCode, ok, _body} = await requester.post('/users').send(mockUser)
            expect(_body.data).to.have.property('_id')

            await requester.delete(`/users/${_body.data._id}`)
        })

        it('El endpoint POST /user debe devolver un 400 al intentar crear un usuario que ya existe en BD', async () => {
            const mockUser = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest@mail.com",
                password: "123456"       
            }
            const response = await requester.post('/users').send(mockUser)

            const mockUser2 = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest@mail.com",
                password: "123456"       
            }

            const{ statusCode, ok, _body} = await requester.post('/users').send(mockUser2)
            expect(statusCode).to.be.equal(400)

            await requester.delete(`/users/${response._body.data._id}`)
        })

        it('El endpoint POST /users debe crear un usuario y guardar en BD un hash de la contraseña ingresada ', async () => {
            const mockUser = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest@mail.com",
                password: "123456"       
            }
            
            const passwordOrigin = mockUser.password

            const response = await requester.post('/users').send(mockUser)

           const userInDB = await requester.get(`/users/${response._body.data._id}`)
           const passwordSave = await userInDB._body.data.password

            expect(passwordOrigin).to.not.equal(passwordSave)

            await requester.delete(`/users/${response._body.data._id}`)
        })
    })


    describe('Test de Users GET', () => {

        it('El endpoint GET /users:id debe devolver un usuario por el ID', async () => {

            const mockUser = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest@mail.com",
                password: "123456"       
            }

            const response = await requester.post('/users').send(mockUser)
            expect(response._body.data).to.have.property('_id')

            const{ statusCode, ok, _body} = await requester.get(`/users/${response._body.data._id}`)
            expect(statusCode).to.be.equal(200)

            await requester.delete(`/users/${response._body.data._id}`)
        })

        it('El endpoint GET /users:id debe devolver 404 al no encontrar un usuario por el ID', async () => {

            const mockUser = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest@mail.com",
                password: "123456"       
            }

            const response = await requester.post('/users').send(mockUser)

            await requester.delete(`/users/${response._body.data._id}`)

            const{ statusCode, ok, _body} = await requester.get(`/users/${response._body.data._id}`)
            expect(statusCode).to.be.equal(404)
        })


        it('El endpoint GET /users debe devolver los usuarios', async () => {

            const mockUser1 = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest1@mail.com",
                password: "123456"       
            }
            const mockUser2 = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest2@mail.com",
                password: "123456"       
            }

            const response1 = await requester.post('/users').send(mockUser1)
            const response2 = await requester.post('/users').send(mockUser2)

            const{ statusCode, ok, _body} = await requester.get(`/users`)
            expect(response1._body.data).to.have.property('_id')
            expect(response2._body.data).to.have.property('_id')
            expect(statusCode).to.be.equal(200)

            await requester.delete(`/users/${response1._body.data._id}`)
            await requester.delete(`/users/${response2._body.data._id}`)
        })  
    })


    describe('Test de Users PATCH', () => {

        it('El endpoint PATCH /user debe devolver un 201 al intentar actualizar el nombre de un usuario', async () => {
            const mockUser = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest@mail.com",
                password: "123456"       
            }
            const response = await requester.post('/users').send(mockUser)

            const mockUser2 = {
                first_name: "DiegoMODIFICADO",    
            }

            const{ statusCode, ok, _body} = await requester.patch(`/users/${response._body.data._id}`).send(mockUser2)
            expect(statusCode).to.be.equal(201)

            await requester.delete(`/users/${response._body.data._id}`)
        })

        it('El endpoint PATCH /users debe devolver un 404 al intentar actualizar un usuario pasando un campo en blanco', async () => {

            const mockUser = {
                first_name: ""
            }

            const{ statusCode, ok, _body} = await requester.patch('/users').send(mockUser)
            expect(statusCode).to.be.equal(404)
        })

        it('El endpoint PATCH /user debe devolver un 400 al intentar crear un usuario que ya existe en BD', async () => {
            const mockUser = {
                first_name: "Diego1",
                last_name: "Videla",
                email: "diegoTest1@mail.com",
                password: "123456"       
            }
            const response = await requester.post('/users').send(mockUser)

            const mockUser2 = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest1@mail.com",
                password: "123456"       
            }

            const{ statusCode, ok, _body} = await requester.patch(`/users/${response._body.data._id}`).send(mockUser2)
            expect(statusCode).to.be.equal(400)

            await requester.delete(`/users/${response._body.data._id}`)
        })
    })


    describe('Test de Users DELETE', () => {

        it('El endpoint DELETE /users:id debe Eliminar un usuario por el ID', async () => {

            const mockUser = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest@mail.com",
                password: "123456"       
            }

            const response = await requester.post('/users').send(mockUser)
            expect(response._body.data).to.have.property('_id')

            const{ statusCode, ok, _body} = await requester.delete(`/users/${response._body.data._id}`)
            expect(statusCode).to.be.equal(200)
        })

        it('El endpoint DELETE /users:id debe devolver 404 al no encontrar un usuario por el ID', async () => {

            const mockUser = {
                first_name: "Diego",
                last_name: "Videla",
                email: "diegoTest@mail.com",
                password: "123456"       
            }

            const response = await requester.post('/users').send(mockUser)
            await requester.delete(`/users/${response._body.data._id}`)

            const{ statusCode, ok, _body} = await requester.delete(`/users/${response._body.data._id}`)
            expect(statusCode).to.be.equal(404)
        })
    })

})