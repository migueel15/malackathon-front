import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://tu-backend.com/api/datos-salud") // tu endpoint
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // --- Procesamiento de datos para distintos tipos de relaciones ---
  const edadPorDiagnostico = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.diagnostico])
        acc[item.diagnostico] = {
          diagnostico: item.diagnostico,
          promedioEdad: 0,
          count: 0,
        };
      acc[item.diagnostico].promedioEdad += item.edad;
      acc[item.diagnostico].count++;
      return acc;
    }, {})
  ).map((d) => ({
    diagnostico: d.diagnostico,
    promedioEdad: (d.promedioEdad / d.count).toFixed(1),
  }));

  const conteoPorSexo = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.sexo]) acc[item.sexo] = { sexo: item.sexo, cantidad: 0 };
      acc[item.sexo].cantidad++;
      return acc;
    }, {})
  );

  const conteoPorPosibleEnfermedad = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.posibleEnfermedad])
        acc[item.posibleEnfermedad] = {
          posibleEnfermedad: item.posibleEnfermedad,
          cantidad: 0,
        };
      acc[item.posibleEnfermedad].cantidad++;
      return acc;
    }, {})
  );

  const dispersionEdadDiagnostico = data.map((item) => ({
    x: item.edad,
    y: item.diagnostico,
  }));

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#00C49F",
    "#0088FE",
  ];

  // --- Render ---
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {/* Barras: Edad promedio por diagnóstico */}
      <div>
        <h2 className="text-xl font-bold mb-2">
          Edad promedio por diagnóstico
        </h2>
        <BarChart width={500} height={300} data={edadPorDiagnostico}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="diagnostico" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="promedioEdad" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Circular: Distribución por sexo */}
      <div>
        <h2 className="text-xl font-bold mb-2">Distribución por sexo</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={conteoPorSexo}
            dataKey="cantidad"
            nameKey="sexo"
            outerRadius={100}
          >
            {conteoPorSexo.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Barras: Casos por posible enfermedad */}
      <div>
        <h2 className="text-xl font-bold mb-2">Casos por posible enfermedad</h2>
        <BarChart width={500} height={300} data={conteoPorPosibleEnfermedad}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="posibleEnfermedad" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Dispersión: Edad vs Diagnóstico */}
      <div>
        <h2 className="text-xl font-bold mb-2">
          Dispersión: Edad vs Diagnóstico
        </h2>
        <ScatterChart width={500} height={300}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Edad" />
          <YAxis type="category" dataKey="y" name="Diagnóstico" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter
            name="Pacientes"
            data={dispersionEdadDiagnostico}
            fill="#ff7f50"
          />
        </ScatterChart>
      </div>
    </div>
  );
}
