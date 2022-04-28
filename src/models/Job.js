export class Job
{
    constructor(data = {})
    {
        this.id = data.id;
        this.jobTitle = data.jobTitle;
        this.rate = data.rate;
        this.hours = data.hours;
        this.description = data.description;
        this.company = data.company;
        this.creatorId = data.creatorId;
    }
}