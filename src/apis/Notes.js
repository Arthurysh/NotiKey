import Api from "./Api";


export default {
    
  viewList(userIdObj) {
    console.log(userIdObj)
    return Api.get(`/notesInfo?userId=${userIdObj}`);
  },
  statusList(){
    return Api.get("/getStatus");

  }
  

};
