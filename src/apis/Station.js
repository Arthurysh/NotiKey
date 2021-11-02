import Api from "./Api";


export default {
    createStation(addObject) {
    return Api.post("/createStation", addObject);
  },
  viewList() {
    return Api.get("/stationInfo");
  },

};
