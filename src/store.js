import { configureStore } from "@reduxjs/toolkit";
import devicesReducer from "./redux-store/devices/DevicesSlice";

export const store = configureStore({
	reducer: {
		devices: devicesReducer,
	},
});
