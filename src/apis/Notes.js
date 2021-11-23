import Api from "./Api";


export default {
    
  viewList(userIdObj) {
    return Api.get(`/notesInfo?userId=${userIdObj}`);
  },
  statusList(){
    return Api.get("/getStatus");
  },
  ServicesList(){
    return Api.get("/getServicesList");
  }

};
