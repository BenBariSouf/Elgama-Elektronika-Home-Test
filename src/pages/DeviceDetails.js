// library imports
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

//hooks imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDevice } from "../redux-store/devices/DevicesSlice";
import { Link } from "react-router-dom";

//component imports
import LineChart from "../components/LineChart";

const StyledTableCell = styled(TableCell)(() => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#d4d4d4",
		fontSize: 15,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(() => ({
	"&:nth-of-type(odd)": {
		backgroundColor: "#ededed",
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
	"&:hover": {
		backgroundColor: "#dfdfdf",
	},
}));

const Device = () => {
	const dispatch = useDispatch();

	// device id
	const { id } = useParams();

	//table pagination logic
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	//get selected device from redux store
	const { itemsData: device } = useSelector((state) => state.devices);

	// split the device array into separate arrays of the different metrics
	const o_1_4_0_Data = device.data.map((element) => [element.date_time, element.o_1_4_0]);
	const o_2_4_0_Data = device.data.map((element) => [element.date_time, element.o_2_4_0]);
	const o_3_4_0_Data = device.data.map((element) => [element.date_time, element.o_3_4_0]);
	const o_4_4_0_Data = device.data.map((element) => [element.date_time, element.o_4_4_0]);

	// construct new array to be used in the line chart
	const allData = [o_1_4_0_Data, o_2_4_0_Data, o_3_4_0_Data, o_4_4_0_Data];

	useEffect(() => {
		dispatch(getDevice(id));
	}, []);

	return (
		<>
			{device.data.length > 0 ? (
				<>
					{device.data[0].device_id == id && <LineChart data={allData} />}
					<div style={{ display: " flex", justifyContent: "center", alignItems: "center", paddingBottom: "80px" }}>
						<Paper sx={{ overflow: "hidden" }}>
							<TableContainer component={Paper}>
								<Table stickyHeader aria-label="sticky table" sx={{ minWidth: 1000, height: 600 }}>
									<TableHead>
										<TableRow>
											<StyledTableCell align="center">Date</StyledTableCell>
											<StyledTableCell align="center">o_1_4_0</StyledTableCell>
											<StyledTableCell align="center">o_2_4_0</StyledTableCell>
											<StyledTableCell align="center">o_3_4_0</StyledTableCell>
											<StyledTableCell align="center">o_4_4_0</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{device.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ o_1_4_0, o_2_4_0, o_3_4_0, o_4_4_0, date_time }, index) => (
											<StyledTableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
												<TableCell scope="row" align="center">
													{date_time}
												</TableCell>
												<TableCell align="center">{o_1_4_0}</TableCell>
												<TableCell align="center">{o_2_4_0}</TableCell>
												<TableCell align="center">{o_3_4_0}</TableCell>
												<TableCell align="center">{o_4_4_0}</TableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[10, 25, 100, { label: "All", value: -1 }]}
								component="div"
								count={device.data.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</Paper>
					</div>
				</>
			) : (
				<div style={{ textAlign: "center" }}>
					<h1 style={{ marginTop: "22%" }}>No data available for this device</h1>
					<Link to="/">Go Back</Link>
				</div>
			)}
		</>
	);
};

export default Device;
