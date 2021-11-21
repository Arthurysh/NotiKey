import Api from "./Api";


export default {
    
  viewList() {
    return Api.get("/notesInfo");
  },
  statusList(){
    return Api.get("/getStatus");

  }
  

};
