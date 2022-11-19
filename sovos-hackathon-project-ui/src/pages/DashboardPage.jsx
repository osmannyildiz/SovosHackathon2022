import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import "./DashboardPage.css";

export default function DashboardPage() {
	useEffect(() => {
		const dataRadar = {
			labels: [
				"lorem",
				"ipsum",
				"dolor",
				"sit",
				"amet",
				"consectetur",
				"adipisicing",
			],
			datasets: [
				{
					label: "Payable Amount",
					data: [65, 59, 90, 81, 56, 55, 40],
					fill: true,
					backgroundColor: "rgba(133, 105, 241, 0.2)",
					borderColor: "rgb(133, 105, 241)",
					pointBackgroundColor: "rgb(133, 105, 241)",
					pointBorderColor: "#fff",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgb(133, 105, 241)",
				},
				{
					label: "Total Invoice",
					data: [28, 48, 40, 19, 96, 27, 100],
					fill: true,
					backgroundColor: "rgba(54, 162, 235, 0.2)",
					borderColor: "rgb(54, 162, 235)",
					pointBackgroundColor: "rgb(54, 162, 235)",
					pointBorderColor: "#fff",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgb(54, 162, 235)",
				},
			],
		};

		const configRadarChart = {
			type: "radar",
			data: dataRadar,
			options: {},
		};

		var chartBar = new Chart(
			document.getElementById("chartRadar"),
			configRadarChart
		);
	}, []);

	return (
		<MainLayout>
			<section className="header">
				<h2>Dashboard</h2>
				<hr />
			</section>
			<div className="shadow-lg rounded-lg overflow-hidden">
				<canvas className="p-5" id="chartRadar"></canvas>
			</div>
		</MainLayout>
	);
}
