export class House
{
    constructor(data = {})
    {
        this.id = data.id;
        this.year = data.year;
        this.price = data.price;
        this.bathrooms = data.bathrooms;
        this.bedrooms = data.bedrooms;
        this.levels = data.levels;
        this.imgUrl = data.imgUrl;
        this.description = data.description;
        this.creatorID = data.creatorID;
    }
}