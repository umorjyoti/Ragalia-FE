// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import dashboardReducer from "../features/dashboard/dashboardSlice";
// import propertiesReducer from "../features/properties/propertiesSlice";
// import peopleReducer from "../features/people/peopleSlice";
// import profileReducer from "../features/profile/profileSlice";
// import settingsReducer from "../features/settings/settingsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // dashboard: dashboardReducer,
    // properties: propertiesReducer,
    // people: peopleReducer,
    // profile: profileReducer,
    // settings: settingsReducer,
  },
});

export default store;
