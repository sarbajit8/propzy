import {configureStore} from "@reduxjs/toolkit";

import adminAuthReducer from "./admin/admin-login/index.js"





const store = configureStore({
    reducer:{
     adminAuth: adminAuthReducer,


           }
})


export default store;