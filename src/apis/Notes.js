import Api from "./Api";


export default {

    viewList(userIdObj) {
        return Api.get(`/notesInfo?userId=${userIdObj}`);
    },
    statusList() {
        return Api.get("/getStatus");
    },
    ServicesList() {
        return Api.get("/getServicesList");
    },
    TimeList() {
        return Api.get("/getTimeList");
    },
    insertNotes(createNotes) {
        console.log(createNotes);

        return Api.post("/insertNotes", createNotes);
    },
    deleteNotes(ObjDelete) {
        return Api.post("/deleteNotes", ObjDelete);
    }



};