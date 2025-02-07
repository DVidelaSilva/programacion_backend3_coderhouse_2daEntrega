import Mocha from 'mocha'
import * as chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'

const expect = chai.expect
const requester = supertest('http://localhost:8080')



describe('Testing de Adoptions ', () => {

    describe('Test de Adoptions POST', () => {

        it('El endpoint POST /Adoptions/user/:uid/pet/pid debe devolver un 201 al crear una adopcion', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)

            const{ statusCode, ok, _body} = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`).send(mockUser)
            expect(statusCode).to.be.equal(201)

            const responseAdoption = await requester.get(`/adoption/${_body.data._id}`)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)

        })

        it('El endpoint POST /Adoptions/user/:uid/pet/pid debe devolver un 400 al crear una adopcion con una mascota ya adoptada', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)

            const adoption = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`)

            const{ statusCode, ok, _body} = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`)            
            expect(statusCode).to.be.equal(400)

            const responseAdoption = await requester.get(`/adoption/${adoption._body.data._id}`)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)
        })

        it('El endpoint POST /Adoptions/user/:uid/pet/pid debe agregar el ID del pet al usuario al crear una adopcion', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)

            const{ statusCode, ok, _body} = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`).send(mockUser)

            const idPet = responsePet._body.data._id
            const user = await requester.get(`/users/${responseUser._body.data._id}`)
            const idPetInUser = user._body.data.pets[0]
            expect(idPet).to.be.equal(idPetInUser)

            const responseAdoption = await requester.get(`/adoption/${_body.data._id}`)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)
        })

        it('El endpoint POST /Adoptions/user/:uid/pet/pid debe agregar el ID del owner al pet al crear una adopcion', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)

            const{ statusCode, ok, _body} = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`).send(mockUser)

            const idUser = responseUser._body.data._id
            const pet = await requester.get(`/pets/${responsePet._body.data._id}`) 
            const idOwner = pet._body.data.owner
            expect(idUser).to.be.equal(idOwner)

            const responseAdoption = await requester.get(`/adoption/${_body.data._id}`)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)

        })

        it('El endpoint POST /Adoptions/user/:uid/pet/pid debe cambiar el campo adopted a true del pet al crear una adopcion', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)

            const{ statusCode, ok, _body} = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`).send(mockUser)

            const idUser = responseUser._body.data._id
            const pet = await requester.get(`/pets/${responsePet._body.data._id}`)
            expect(pet._body.data.adopted).to.be.equal(true)

            const responseAdoption = await requester.get(`/adoption/${_body.data._id}`)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)
        })
    })


    describe('Test de Adoption GET', () => {

        it('El endpoint GET /adoption:id debe devolver una adopcion por el ID', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)

            const responseAdoption = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`).send(mockUser)

            const{ statusCode, ok, _body} = await requester.get(`/adoption/${responseAdoption._body.data._id}`)
            expect(statusCode).to.be.equal(200)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)
        })

        it('El endpoint GET /adoption:id debe devolver 404 al no encontrar una adopcion por el ID', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)

            const responseAdoption = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`).send(mockUser)

            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)

            const{ statusCode, ok, _body} = await requester.get(`/adoption/${responseAdoption._body.data._id}`)
            expect(statusCode).to.be.equal(404)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
        })

        it('El endpoint GET /adoption debe devolver las adopciones', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)

            const responseAdoption = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`)

            const{ statusCode, ok, _body} = await requester.get(`/adoption`)
            expect(statusCode).to.be.equal(200)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)

        })  
    })


    describe('Test de Adoption PATCH', () => {

        it('El endpoint PATCH /user debe devolver un 201 al intentar actualizar una adopcion', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const mockPet2 = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)
            const responsePet2 = await requester.post('/pets').send(mockPet2)

            const responseAdoption = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`)

            const mockAdoption = {
                "owner_id": responseUser._body.data._id,
                "pet_id": responsePet2._body.data._id
            }

            const{ statusCode, ok, _body} = await requester.patch(`/adoption/${responseAdoption._body.data._id}`).send(mockAdoption)
            expect(statusCode).to.be.equal(201)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
            await requester.delete(`/pets/${responsePet2._body.data._id}`)
            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)
        })

        it('El endpoint PATCH /user debe devolver un 404 al intentar actualizar y no encontrar la adopcion', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)
        
            const responseAdoption = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`)

            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)

            const mockAdoption = {
                "owner_id": "67a54b0fb86fe0797be44e31",
                "pet_id": "67a54b0fb86fe0797be44e31"
            }

            const{ statusCode, ok, _body} = await requester.patch(`/adoption/${responseAdoption._body.data._id}`).send(mockAdoption)
            expect(statusCode).to.be.equal(404)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
        })

        it('El endpoint PATCH /user debe devolver un 400 al intentar actualizar pasando un campo vacio', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)
        
            const responseAdoption = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`)

            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)

            const mockAdoption = {
                "owner_id": "",
                "pet_id": "67a54b0fb86fe0797be44e31"
            }

            const{ statusCode, ok, _body} = await requester.patch(`/adoption/${responseAdoption._body.data._id}`).send(mockAdoption)
            expect(statusCode).to.be.equal(400)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
        })
    })

    describe('Test de Adoption DELETE', () => {

        it('El endpoint DELETE /adoption debe devolver un 200 al intentar eliminar una adopcion', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)

            const responseAdoption = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`)

            const{ statusCode, ok, _body} = await requester.delete(`/adoption/${responseAdoption._body.data._id}`)
            expect(statusCode).to.be.equal(200)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
        })

        it('El endpoint DELETE /adoption debe devolver un 404 al intentar eliminar y no encontrar la adopcion', async () => {

            const mockUser = {
                first_name: "testname",
                last_name: "testapellido",
                email: "testmail@mail.com",
                password: "123456"       
            }
            const responseUser = await requester.post('/users').send(mockUser)

            const mockPet = {
                name: "petname",
                type: "typepet",
                age_months: 3,
                age_years: 2     
            }
            const responsePet = await requester.post('/pets').send(mockPet)
        
            const responseAdoption = await requester.post(`/adoption/user/${responseUser._body.data._id}/pet/${responsePet._body.data._id}`)

            await requester.delete(`/adoption/${responseAdoption._body.data._id}`)

            const{ statusCode, ok, _body} = await requester.delete(`/adoption/${responseAdoption._body.data._id}`)
            expect(statusCode).to.be.equal(404)

            await requester.delete(`/users/${responseUser._body.data._id}`)
            await requester.delete(`/pets/${responsePet._body.data._id}`)
        })
    })
})

