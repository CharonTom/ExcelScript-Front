import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

function App() {
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://localhost:5000/results");
        setResults(response.data);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des résultats :",
          error
        );
      }
    };

    fetchResults();
  }, []);
  console.log(results);

  const Chartdata = [
    {
      name: "lundi au vendredi (8h-20h)",
      Energie: parseFloat(results.weekPower),
    },
    { name: "samedi (8h-20h)", Energie: parseFloat(results.saturdayPower) },
    { name: "le reste", Energie: parseFloat(results.otherPower) },
  ];

  return (
    <main className="main" style={{ textAlign: "center" }}>
      <h1>Consommation d'énergie du 1er Avril au 28 Février 2022</h1>
      <div>
        <p>
          Puissance accumulée du lundi au vendredi (8h-20h) :{" "}
          <span>{results.weekPower} kWh</span>{" "}
        </p>
        <p>
          Puissance accumulée le samedi (8h-20h) :{" "}
          <span>{results.saturdayPower} kWh</span>{" "}
        </p>
        <p>
          Puissance accumulée le reste du temps :{" "}
          <span>{results.otherPower} kWh</span>{" "}
        </p>
      </div>
      <div>
        <div className="chart">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="Energie"
              isAnimationActive={false}
              data={Chartdata}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip formatter={(value) => `${value} kWh`} />
          </PieChart>
          <BarChart
            width={500}
            height={300}
            data={Chartdata}
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip formatter={(value) => `${value} kWh`} />
            <Legend formatter={(value) => `${value} kWh`} />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Energie"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </div>
      </div>
    </main>
  );
}

export default App;
