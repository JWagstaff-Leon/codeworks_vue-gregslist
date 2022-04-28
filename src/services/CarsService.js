import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { api } from "./AxiosService.js";

class CarsService
{
    async addCar(newCarData)
    {
        const res = await api.post('api/cars', newCarData);
        return res.data;
    }

    async getAllCars()
    {
        const res = await api.get("api/cars");
        AppState.cars = res.data.map(v => new Car(v));
    }

    async getCarById(id)
    {
        const res = await api.get("api/cars/" + id);
        AppState.car = new Car(res.data);
    }

    async editCar(carData)
    {
        const res = await api.put("api/cars/" + carData.id, carData);
        AppState.car = new Car(res.data);
    }

    async deleteCar(id)
    {
        await api.delete("api/cars/" + id);
    }
}

export const carsService = new CarsService();