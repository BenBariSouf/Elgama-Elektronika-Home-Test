// library imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

//hooks imports
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
const DevicesTable = () => {
	const navigate = useNavigate();
	// retrieve devices from redux store
	const devices = useSelector((state) => state.devices);

	return (
		<div style={{ display: " flex", justifyContent: "center", alignItems: "center" }}>
			<TableContainer component={Paper} sx={{ width: "65%", marginTop: "9%" }}>
				<Table sx={{ maxWidth: 1200, minWidth: 1000, height: 600 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="center">Device Name</StyledTableCell>
							<StyledTableCell align="center">FW Version</StyledTableCell>
							<StyledTableCell align="center">Type</StyledTableCell>
							<StyledTableCell align="center">Data poll</StyledTableCell>
							<StyledTableCell align="center">Created On</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{devices.items.map(({ id, device_name, fw_version, device_type, data_poll_enabled, created_on }, index) => (
							<StyledTableRow
								key={index}
								onClick={() => {
									navigate(`/devices/${id}`);
								}}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row" align="center">
									{device_name}
								</TableCell>

								<TableCell component="th" align="center">
									{fw_version}
								</TableCell>

								<TableCell component="th" align="center">
									{device_type}
								</TableCell>

								<TableCell align="center">{data_poll_enabled ? <Chip label="Enabled" color="success" /> : <Chip label="Disabled" color="error" />}</TableCell>
								<TableCell align="center" component="th">
									<span>{new Date(created_on).toISOString().substring(0, 10)}</span>
									<br />
									<span>{new Date(created_on).toTimeString().split(" ")[0]}</span>
								</TableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default DevicesTable;
