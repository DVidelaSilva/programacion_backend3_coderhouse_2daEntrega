import { Faker, en, es, fa } from "@faker-js/faker";


const faker = new Faker({
    locale: [es, en]
})

const generateUserFaker = () => {


    return {
        
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({length:60}, 'coder123'),        
        role: faker.number.int() % 2 === 0 ? 'user' : 'admin',
        pets: [],
        _id: faker.database.mongodbObjectId(),
        __v: 0

    }
}


export default generateUserFaker


