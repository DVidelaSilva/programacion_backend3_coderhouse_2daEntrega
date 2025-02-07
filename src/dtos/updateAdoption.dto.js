

class UpdateAdoptionDto {

    constructor(adoption) {

        this.owner_id = adoption.owner_id;
        this.pet_id = adoption.pet_id;
        
    }
}


export default UpdateAdoptionDto