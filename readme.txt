=======================================================
   LÓGICA DE AGRUPACIÓN DE COMPETIDORES (GroupingLogic)
=======================================================

Este archivo contiene la lógica para agrupar competidores de Taekwondo
en gráficas compatibles, tomando en cuenta género, grado, peso, edad 
y modalidad. El objetivo es formar grupos (gráficas) justos y seguros 
para la competencia, evitando dejar participantes fuera cuando sea posible.

------------------------
¿CÓMO FUNCIONA EL SCRIPT?
------------------------

1. **Normalización de datos**
   - Se limpia el texto (espacios, mayúsculas, etc.) para estandarizarlo.
   - Se convierte el grado a un grupo numérico: 
     (1 = Principiante, 2 = Intermedio, 3 = Avanzado).

2. **Separación por género**
   - Se crean grupos separados para hombres y mujeres. No se mezclan.

3. **Clasificación por grado**
   - Cada competidor se agrupa según su grado técnico dentro de los tres grupos mencionados.
   - Esto facilita controlar compatibilidad entre niveles.

4. **Agrupación por compatibilidad**
   - Se intenta formar grupos de hasta 4 personas con base en los siguientes filtros:

   ➤ Grado compatible
     - Por defecto: deben ser del mismo grupo.
     - En niveles de tolerancia mayores, se aceptan diferencias de ±1 grupo.

   ➤ Peso compatible
     - Se agrupan si la diferencia de peso es ≤ 5 kg.
     - Si el peso base es >80kg (hombres) o >75kg (mujeres), no se aplica límite.

   ➤ Edad compatible
     - Adultos (18+) se agrupan entre sí.
     - Menores pueden agruparse si tienen ≤ 2 años de diferencia.
     - En niveles mayores, se permite agrupar un menor de 17 con un adulto si la diferencia es ≤ 2 años.

   ➤ Modalidad compatible
     - No se mezclan modalidades incompatibles (dobles vs combate/formas).
     - Se permiten combinaciones si no hay conflicto (ver ejemplos abajo).

   ➤ Máximo de integrantes por gráfica: 4

5. **Niveles de tolerancia**
   - `nivel = 0`: reglas estrictas.
   - `nivel = 1`: permite grados cercanos.
   - `nivel = 2`: también permite edades cercanas entre menor y adulto.

6. **Resultados**
   - Se devuelven:
     - Las gráficas armadas
     - La asignación de cada competidor (o motivo de descarte)
     - Una etiqueta que describe la flexibilidad usada (normal, con tolerancia o flexible)

------------------------------------
EJEMPLOS DE COMPATIBILIDAD PERMITIDA
------------------------------------

✔ Hombre, 17 años, 68kg, grupo 2 → con Hombre, 19 años, 70kg, grupo 2 → *Sí* (nivel 2 requerido)
✔ Mujer, 12 años, 45kg, grupo 1 → con Mujer, 14 años, 47kg, grupo 1 → *Sí*
✘ Hombre, 22 años, 74kg, grupo 3 (combate) → con Hombre, 22 años, 75kg, grupo 3 (dobles) → *No*

----------------------------
PROPUESTAS DE MEJORA FUTURAS
----------------------------

1. **Control por estatura**
   - Incluir compatibilidad por estatura (opcional) para gráficas más justas.

2. **Visualización previa**
   - Mostrar al usuario por qué un competidor no fue agrupado (ej: peso incompatible, grado distinto, etc.).

3. **Agrupación secundaria (formas o mixtas)**
   - Permitir que personas no aptas para combate se agrupen en otras modalidades como formas individuales.

4. **Soporte para equipos**
   - Manejar modalidades grupales (ej. tercias, equipos de formas o dobles) si existen.

5. **Ajuste dinámico del límite de peso**
   - En lugar de un corte fijo de 5kg, usar porcentajes o bandas proporcionales.

6. **Exportación visual**
   - Generar PDF, tabla HTML o Excel con las gráficas resultantes para fácil uso en torneo.

7. **Simulación sin modificar datos**
   - Permitir una “simulación” que muestre resultados sin marcar competidores como "usados".

8. **Tolerancia gradual por edad**
   - En vez de reglas binarias (menor o mayor), usar escalones flexibles por rango (12–14, 15–17, etc.)

-------------------------
CONTACTO Y AUTORÍA
-------------------------

Este archivo fue diseñado para facilitar la organización de competencias
de Taekwondo con criterios técnicos objetivos y configurables.

Autor: Andrés Michel + Asistente IA
Fecha: Julio 2025

