import React from 'react';

const MatchTable = ({ titulo, competidores }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="font-semibold text-lg mb-2">{titulo}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th>No</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Grado</th>
            <th>Peso</th>
            <th>Estatura</th>
            <th>Modalidad</th>
          </tr>
        </thead>
        <tbody>
          {competidores.map((c) => (
            <tr key={c.No}>
              <td>{c.No}</td>
              <td>{`${c.Nombre} ${c.Apellido}`}</td>
              <td>{c.Edad}</td>
              <td>{c['H / M']}</td>
              <td>{c.Grado}</td>
              <td>{c.Peso}</td>
              <td>{c.Estatura}</td>
              <td>{c.Modalidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
