

class CreatePetDto {

    constructor(pet) {

        this.name = pet.name;
        this.type = pet.type;
        this.age_months = pet.age_months;
        this.age_years = pet.age_years;
    }
}


export default CreatePetDto