import { Faker, en, es, fa } from "@faker-js/faker";


const faker = new Faker({
    locale: [es, en]
})

const generatePetFaker = () => {


    return {
        
        name: faker.animal.petName(),
        type: faker.number.int() % 2 === 0 ? 'gato' : 'perro',
        age_months: faker.number.int({min: 1, max: 12}),
        age_years: faker.number.int({min: 0, max: 12}),        
        owner: 'false',
        adopted: 'false',
        _id: faker.database.mongodbObjectId(),
        __v: 0

    }
}


export default generatePetFaker


