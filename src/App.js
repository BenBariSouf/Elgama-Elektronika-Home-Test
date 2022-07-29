import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import DevicesTable from "./pages/Devices";
import Device from "./pages/DeviceDetails";
import NotFound from "./components/NotFound";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<DevicesTable />} />
			<Route path="/devices/:id" element={<Device />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
