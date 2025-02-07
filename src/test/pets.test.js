import Mocha from 'mocha'
import * as chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'

const expect = chai.expect
const requester = supertest('http://localhost:8080')



describe('Testing de Pets ', () => {

    describe('Test de Pets POST', () => {

        it('El endpoint POST /Pets debe devolver un 400 al intentar crear una mascota sin pasarle uno de los campos', async () => {
            const mockPet = {
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const{ statusCode, ok, _body} = await requester.post('/pets').send(mockPet)
            expect(statusCode).to.be.equal(400)
        })

        it('El endpoint POST /pets debe crear una mascota correctamente', async () => {
            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const{ statusCode, ok, _body} = await requester.post('/pets').send(mockPet)
            expect(_body.data).to.have.property('_id')

            await requester.delete(`/pets/${_body.data._id}`)
        })
    })


    describe('Test de Pets GET', () => {

        it('El endpoint GET /pets:id debe devolver una mascota por el ID', async () => {

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }

            const response = await requester.post('/pets').send(mockPet)
            expect(response._body.data).to.have.property('_id')

            const{ statusCode, ok, _body} = await requester.get(`/pets/${response._body.data._id}`)
            expect(statusCode).to.be.equal(200)

            await requester.delete(`/pets/${response._body.data._id}`)
        })

        it('El endpoint GET /pets:id debe devolver 404 al no encontrar una mascota por el ID', async () => {

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }

            const response = await requester.post('/pets').send(mockPet)

            await requester.delete(`/pets/${response._body.data._id}`)

            const{ statusCode, ok, _body} = await requester.get(`/pets/${response._body.data._id}`)
            expect(statusCode).to.be.equal(404)
        })


        it('El endpoint GET /pets debe devolver las mascotas', async () => {

            const mockPet1 = {
                name: "petname1",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const mockPet2 = {
                name: "petname2",
                type: "typepet",
                age_months: 5,
                age_years: 0     
            }

            const response1 = await requester.post('/pets').send(mockPet1)
            const response2 = await requester.post('/pets').send(mockPet2)

            const{ statusCode, ok, _body} = await requester.get(`/pets`)
            expect(response1._body.data).to.have.property('_id')
            expect(response2._body.data).to.have.property('_id')
            expect(statusCode).to.be.equal(200)

            await requester.delete(`/pets/${response1._body.data._id}`)
            await requester.delete(`/pets/${response2._body.data._id}`)
        })  
    })


    describe('Test de Pets PATCH', () => {

        it('El endpoint PATCH /pets:id debe devolver un 201 al intentar actualizar el nombre de una mascota', async () => {
            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const response = await requester.post('/pets').send(mockPet)

            const mockPet2 = {
                name: "petnameMODIFICADO",   
            }

            const{ statusCode, ok, _body} = await requester.patch(`/pets/${response._body.data._id}`).send(mockPet2)
            expect(statusCode).to.be.equal(201)

            await requester.delete(`/pets/${response._body.data._id}`)
        })

        it('El endpoint PATCH /pets:id debe devolver un 404 al intentar actualizar una mascota pasando un campo en blanco', async () => {

            const mockPet = {
                name: ""
            }

            const{ statusCode, ok, _body} = await requester.patch('/pets').send(mockPet)
            expect(statusCode).to.be.equal(404)
        })
    })


    describe('Test de Pets DELETE', () => {

        it('El endpoint DELETE /pets:id debe Eliminar una mascota por el ID', async () => {

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }

            const response = await requester.post('/pets').send(mockPet)
            expect(response._body.data).to.have.property('_id')

            const{ statusCode, ok, _body} = await requester.delete(`/pets/${response._body.data._id}`)
            expect(statusCode).to.be.equal(200)
        })

        it('El endpoint DELETE /pets:id debe devolver 404 al no encontrar una mascota por el ID', async () => {

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }

            const response = await requester.post('/pets').send(mockPet)
            await requester.delete(`/pets/${response._body.data._id}`)

            const{ statusCode, ok, _body} = await requester.delete(`/pets/${response._body.data._id}`)
            expect(statusCode).to.be.equal(404)
        })
    })

})