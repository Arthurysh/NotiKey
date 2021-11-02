import Api from "./Api";


export default {
    createStation(addObject) {
    return Api.post("/createStation", addObject);
  },
  viewList() {
    return Api.get("/stationInfo");
  },
  delete(deleteItem) {
    return Api.post("/deleteStation", deleteItem);
  },

};
