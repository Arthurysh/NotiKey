import Api from "./Api";


export default {
    createStation(addObject) {
        return Api.post("/createStation", addObject);
    },
    viewList() {
        return Api.get("/stationInfo");
    },
    delete(deleteIdStation) {
        return Api.post("/deleteStation", deleteIdStation);

    },
    editStation(updateInfoStation) {
        return Api.post("/editStation", updateInfoStation);

    },
    getList() {
        return Api.get("/getListStation");
    },
    getStationStatistic() {
        return Api.get("/getStatistic");
    }
};