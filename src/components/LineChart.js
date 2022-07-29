import { useState } from "react";
import Chart from "react-apexcharts";

const LineChart = ({ data }) => {
	// deconstruct the data
	const [o_1_4_0_Data, o_2_4_0_Data, o_3_4_0_Data, o_4_4_0_Data] = data;

	// function to convert date times in the data into ISO8601, since it's the format required to be used in ApexCharts
	const reformatToISO8601 = (array) => array.map(([a, b]) => [new Date(a).getTime(), b]);

	// chart options
	const [options, setOptions] = useState({
		chart: {
			zoom: {
				enabled: true,
			},
		},
		dataLabels: {
			enabled: false,
		},
		zoom: {
			type: "x",
			enabled: true,
			autoScaleYaxis: true,
		},
		stroke: {
			curve: "straight",
		},

		grid: {
			row: {
				colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
				opacity: 0.5,
			},
		},
		xaxis: {
			type: "datetime",

			labels: {
				datetimeUTC: false,
			},
		},
	});

	// chart series
	const [series, setSeries] = useState([
		{
			name: "o_1_4_0",
			data: reformatToISO8601(o_1_4_0_Data),
		},
		{
			name: "o_2_4_0",
			data: reformatToISO8601(o_2_4_0_Data),
		},
		{
			name: "o_3_4_0",
			data: reformatToISO8601(o_3_4_0_Data),
		},
		{
			name: "o_4_4_0",
			data: reformatToISO8601(o_4_4_0_Data),
		},
	]);
	return (
		<div style={{ display: " flex", justifyContent: "center", alignItems: "center", marginTop: "40px", marginBottom: "20px" }}>
			<Chart options={options} series={series} type="line" height={350} width={1200} />
		</div>
	);
};

export default LineChart;
