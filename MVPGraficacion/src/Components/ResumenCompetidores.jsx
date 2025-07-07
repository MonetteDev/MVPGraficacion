import React from 'react';

const ResumenCompetidores = ({ listaOriginal, asignaciones }) => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-3">Resumen de asignación de competidores</h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>No</th>
            <th>Nombre completo</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Grado</th>
            <th>Peso</th>
            <th>Modalidad</th>
            <th>Asignación</th>
          </tr>
        </thead>
        <tbody>
          {listaOriginal.map((c) => (
            <tr key={c.No}>
              <td>{c.No}</td>
              <td>{`${c.Nombre} ${c.Apellido}`}</td>
              <td>{c.Edad}</td>
              <td>{c.Genero.toUpperCase()}</td>
              <td>{c.Grado}</td>
              <td>{c.Peso}</td>
              <td>{c.Modalidad}</td>
              <td className="font-semibold text-blue-700">
                {asignaciones[c.No] || 'No asignado'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResumenCompetidores;
