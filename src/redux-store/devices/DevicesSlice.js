import { createSlice } from "@reduxjs/toolkit";

import Devices from "../../devicedata/devices.json";
import DeviceData from "../../devicedata/data.json";

const initialState = {
	items: Devices,
	itemsData: {
		data: [],
		isSet: false,
	},
};
const devicesSlice = createSlice({
	name: "devices",
	initialState,
	reducers: {
		// get a specific device by its id
		getDevice: (state, action) => {
			const Id = action.payload;
			// find the selected device
			const deviceById = DeviceData.filter((element) => element.device_id == Id);

			state.itemsData = { data: deviceById, isSet: true };
		},
		getDeviceData: (state, action) => {
			console.log("state:", action);
		},
	},
});

export const { getDevice, getDeviceData } = devicesSlice.actions;

export default devicesSlice.reducer;
