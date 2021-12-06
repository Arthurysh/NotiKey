import Api from "./Api";


export default {

    getList(userIdObj) {
        return Api.get(`/getListNameCars?userId=${userIdObj}`);
    },
    getUserCars(userIdObj) {
        return Api.get(`/getUserCars?userId=${userIdObj}`);
    },
    deleteCars(ObjDelete) {
        return Api.post("/deleteCars", ObjDelete);

    },
    addCarsUser(newCar) {
        return Api.post("/addCars", newCar);
    },
};