async function analizarTexto() {
  const estado = document.getElementById("estado");

  try {
    const respuesta = await fetch("lazarillo_limpio.txt");
    if (!respuesta.ok) {
      throw new Error(`El servidor respondió con el estado ${respuesta.status}.`);
    }

    const texto = await respuesta.text();
    const palabras = texto.match(/[a-zñáéíóúü]+/gi) || [];
    const vocales = texto.match(/[aeiouáéíóúü]/gi) || [];
    const consonantes = texto.match(/[bcdfghjklmnñpqrstvwxyz]/gi) || [];
    const limiteInicial = "(?<![a-zñáéíóúü])";
    const limiteFinal = "(?![a-zñáéíóúü])";
    const contar = (expresion) => (texto.match(expresion) || []).length;

    const resultados = {
      "total-palabras": palabras.length,
      "total-vocales": vocales.length,
      "total-consonantes": consonantes.length,
      "apariciones-lazaro": contar(new RegExp(`${limiteInicial}Lázaro${limiteFinal}`, "gi")),
      "apariciones-ciego": contar(new RegExp(`${limiteInicial}ciego${limiteFinal}`, "gi")),
      "apariciones-clerigo": contar(new RegExp(`${limiteInicial}clérigo${limiteFinal}`, "gi")),
      "apariciones-arcipreste": contar(new RegExp(`${limiteInicial}arcipreste${limiteFinal}`, "gi")),
      "apariciones-mi-mujer": contar(new RegExp(`${limiteInicial}mi[ \\t\\r\\n]+mujer${limiteFinal}`, "gi"))
    };

    for (const [identificador, resultado] of Object.entries(resultados)) {
      document.getElementById(identificador).textContent = resultado;
    }
    estado.textContent = "Análisis completado.";
  } catch (error) {
    console.error("No se pudo cargar o analizar lazarillo_limpio.txt:", error);
    estado.textContent = "No se pudo cargar el texto. Comprueba que lazarillo_limpio.txt esté publicado junto a esta página.";
  }
}

analizarTexto();
