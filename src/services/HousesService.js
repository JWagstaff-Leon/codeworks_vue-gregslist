import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class HousesService
{
    async addHouse(newHouseData)
    {
        const res = await api.post("houses", newHouseData);
        return res.data;
    }

    async getAllHouses()
    {
        const res = await api.get("houses");
        AppState.houses = res.data.map(v => new House(v));
    }

    async getHouseById(id)
    {
        const res = await api.get("houses/" + id);
        AppState.house = new House(res.data);
    }

    async editHouse(houseData)
    {
        const res = await api.put("houses/" + houseData.id, houseData);
        AppState.house = new House(res.data);
    }

    async deleteHouse(id)
    {
        await api.delete("houses/" + id);
    }
}

export const housesService = new HousesService();