import Mocha from 'mocha'
import * as chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'

const expect = chai.expect
const requester = supertest('http://localhost:8080')



describe('Testing de Session ', () => {

    describe('Test de session POST Register', () => {

        it('El endpoint POST /sessions/register debe devolver un 400 al intentar registrar un usuario sin pasarle uno de los campos', async () => {
            const mockSession = {
                last_name: "testapellido",
                email: "diegoTest@mail.com",
                password: "123456"       
            }
            const{ statusCode, ok, _body} = await requester.post('/sessions/register').send(mockSession)
            expect(statusCode).to.be.equal(400)
        })

        it('El endpoint POST /sessions/register debe registrar un usuario correctamente', async () => {
            const mockSession = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const{ statusCode, ok, _body} = await requester.post('/sessions/register').send(mockSession)
            expect(_body.data).to.have.property('_id')

            await requester.delete(`/users/${_body.data._id}`)
        })

        it('El endpoint POST /sessions/register debe devolver un 400 al intentar registrar un usuario que ya existe en BD', async () => {
            const mockSession1 = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const response = await requester.post('/sessions/register').send(mockSession1)

            const mockSession2 = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }

            const{ statusCode, ok, _body} = await requester.post('/users').send(mockSession2)
            expect(statusCode).to.be.equal(400)

            await requester.delete(`/users/${response._body.data._id}`)
        })

        it('El endpoint POST /sessions/register debe registrar un usuario y guardar en BD un hash de la contraseña ingresada ', async () => {
            const mockSession = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            
            const passwordOrigin = mockSession.password

            const response = await requester.post('/sessions/register').send(mockSession)

           const userInDB = await requester.get(`/users/${response._body.data._id}`)
           const passwordSave = await userInDB._body.data.password

            expect(passwordOrigin).to.not.equal(passwordSave)

            await requester.delete(`/users/${response._body.data._id}`)
        })
    })


    describe('Test de session POST Login', () => {


        it('El endpoint POST /sessions/login debe loguear un usuario correctamente', async () => {
            const mockSessionRegister = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const response = await requester.post('/sessions/register').send(mockSessionRegister)

            const mockSessionLogin = {
                email: "testmail@mail.com",
                password: "123456"       
            }

            const{ statusCode, ok, _body} = await requester.post('/sessions/login').send(mockSessionLogin)
            expect(statusCode).to.be.equal(200)

            await requester.delete(`/users/${response._body.data._id}`)
        })


        it('El endpoint POST /sessions/login debe loguear un usuario correctamente y devolver el token', async () => {
            const mockSessionRegister = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const response = await requester.post('/sessions/register').send(mockSessionRegister)

            const mockSessionLogin = {
                email: "testmail@mail.com",
                password: "123456"       
            }

            const{ statusCode, ok, _body} = await requester.post('/sessions/login').send(mockSessionLogin)
            expect(_body).haveOwnProperty('token')

            await requester.delete(`/users/${response._body.data._id}`)
        })
    })

})