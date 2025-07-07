const GRUPOS_GRADO = {
  1: ['principiante', '10 kup', '9 kup', '8 kup'],
  2: ['7 kup', '6 kup', '5 kup', '4 kup'],
  3: ['3 kup', '2 kup', '1 kup', 'ieby poom', 'ieby dan', '1 dan', '2 dan', '3 dan', '4 dan', '5 dan', '1 poom', '2 poom', '3 poom', '4 poom', '5 poom'],
};

const normalizar = (dato) =>
  typeof dato === 'string'
    ? dato.trim().toLowerCase().replace(/\s+/g, ' ')
    : dato;

const clasificarGrado = (grado) => {
  const g = normalizar(grado);
  for (const [grupo, grados] of Object.entries(GRUPOS_GRADO)) {
    if (grados.includes(g)) return parseInt(grupo);
  }
  return null;
};

const agruparCompetidores = (rawData, nivel = 0) => {
  const data = rawData.map((c) => ({
    ...c,
    Grado: normalizar(c.Grado),
    Categoria: normalizar(c.Categoría),
    Genero: normalizar(c['H / M']),
    Peso: parseFloat(c.Peso),
    Edad: parseInt(c.Edad),
    GrupoGrado: clasificarGrado(c.Grado),
  }));

  const usados = new Set();
  const graficas = [];
  const pendientes = [];
  const asignaciones = {};
  const etiquetas = {};

  const porGenero = { h: [], m: [] };
  data.forEach((c) => {
    if (c.Genero === 'h' || c.Genero === 'm') porGenero[c.Genero].push(c);
  });

  let graficaCount = 1;

  Object.entries(porGenero).forEach(([genero, competidores]) => {
    const porGrupo = {};
    competidores.forEach((c) => {
      const grupo = c.GrupoGrado;
      if (!grupo) {
        asignaciones[c.No] = 'Grado no válido';
        return;
      }
      porGrupo[grupo] = porGrupo[grupo] || [];
      porGrupo[grupo].push(c);
    });

    const todos = Object.values(porGrupo).flat();
    todos.sort((a, b) => a.Peso - b.Peso);

    while (todos.length > 0) {
      const base = todos.shift();
      if (usados.has(base.No)) continue;

      const pack = [base];
      usados.add(base.No);

      for (let i = 0; i < todos.length && pack.length < 4; i++) {
        const c = todos[i];
        if (usados.has(c.No)) continue;

        // Peso compatible: si la diferencia de peso es menor o igual al límite
        const pesoLimite = base.Peso > (base.Genero === 'h' ? 80 : 75) ? Infinity : 5;
        const diferenciaPeso = Math.abs(base.Peso - c.Peso);
        
        // Mismo género: ambos competidores deben ser del mismo género
        const mismoGenero = c.Genero === base.Genero;
        
        // Grado compatible: deben ser del mismo grupo o tolerancia de ±1 grupo si el nivel es mayor
        const grupoCompatible =
          c.GrupoGrado === base.GrupoGrado ||
          (nivel >= 2 && Math.abs(c.GrupoGrado - base.GrupoGrado) === 1);

        // Edad compatible: ambos mayores de edad, menores con diferencia de ≤ 2 años o tolerancia por nivel
        const ambosMayores = base.Edad >= 18 && c.Edad >= 18;
        const ambosMenoresCompatibles = base.Edad < 18 && c.Edad < 18 && Math.abs(base.Edad - c.Edad) <= 2;
        const edadFlexible =
          nivel >= 2 &&
          ((base.Edad === 17 && c.Edad >= 18) || (c.Edad === 17 && base.Edad >= 18)) &&
          Math.abs(base.Edad - c.Edad) <= 2;

        // Modalidad compatible: no mezclar modalidades incompatibles
        const tieneDoble = pack.some((p) => p.Modalidad === 'doble');
        const tieneCombate = pack.some((p) => p.Modalidad === 'combate');
        const puedeAgregar =
          !tieneDoble ||
          (tieneDoble && c.Modalidad === 'doble' && pack.length < 4) ||
          (tieneCombate && c.Modalidad === 'combate');

        if (
          mismoGenero &&
          grupoCompatible &&
          diferenciaPeso <= pesoLimite &&
          (ambosMayores || ambosMenoresCompatibles || edadFlexible) &&
          puedeAgregar
        ) {
          pack.push(c);
          usados.add(c.No);
          todos.splice(i, 1);
          i--;
        }
      }

      if (pack.length > 1) {
        pack.forEach((c) => {
          asignaciones[c.No] = `Gráfica ${graficaCount}`;
          etiquetas[`Gráfica ${graficaCount}`] =
            nivel === 0
              ? 'Gráfica normal'
              : nivel === 1
              ? 'Gráfica con tolerancia de grado'
              : 'Gráfica flexible por edad/grado';
        });
        graficas.push(pack);
        graficaCount++;
      } else {
        usados.delete(base.No);
        pendientes.push(base);
        asignaciones[base.No] = 'Sin compañeros compatibles';
      }
    }
  });

  return {
    graficas,
    asignaciones,
    etiquetas,
    listaOriginal: data,
  };
};

export { agruparCompetidores };

