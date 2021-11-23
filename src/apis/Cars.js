import Api from "./Api";


export default {
  
  getList(userIdObj) {
    return Api.get(`/getListNameCars?userId=${userIdObj}`);
  },



  

};