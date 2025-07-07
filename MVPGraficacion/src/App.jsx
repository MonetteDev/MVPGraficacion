import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { agruparCompetidores } from './components/GroupingLogic';
import MatchTable from './components/MatchTable';
import FileUploader from './components/FileUploader';
import ResumenCompetidores from './components/ResumenCompetidores';

function App() {
  const [grupos, setGrupos] = useState([]);
  const [asignaciones, setAsignaciones] = useState({});
  const [listaOriginal, setListaOriginal] = useState([]);

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(worksheet);

      const { graficas, asignaciones, listaOriginal } = agruparCompetidores(rawData);
      setGrupos(graficas);
      setAsignaciones(asignaciones);
      setListaOriginal(listaOriginal);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Graficador de Competidores</h1>
      <FileUploader onFileUpload={handleFile} />
      {grupos.length > 0 && (
        <div className="mt-6 space-y-4">
          {grupos.map((grupo, index) => (
            <MatchTable key={index} titulo={`Gráfica ${index + 1}`} competidores={grupo} />
          ))}
        </div>
      )}
      {listaOriginal.length > 0 && (
        <ResumenCompetidores listaOriginal={listaOriginal} asignaciones={asignaciones} />
      )}
    </div>
  );
}

export default App;
