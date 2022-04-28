export class Car
{
    constructor(data = {})
    {
        this.id = data.id;
        this.make = data.make;
        this.model = data.model;
        this.price = data.price;
        this.year = data.year;
        this.color = data.color;        
        this.description = data.description;
        this.imgUrl = data.imgUrl;
        this.creatorId = data.creatorId;
    }
}