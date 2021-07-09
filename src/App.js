import React from "react";
import axios from "axios";
import styled from "@emotion/styled";

import Formulario from "./components/Formulario";
import imagen from "./cryptomonedas.png";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #ffffff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80pxl;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = React.useState("");
  const [criptomoneda, guardarCriptomoneda] = React.useState("");
  const [resultado, guardarResultado] = React.useState({});
  const [cargando, setCargando] = React.useState(false);

  React.useEffect(() => {
    const cotizarCriptomoneda = async () => {
      // Evitamos la ejecucion la primera vez
      if (moneda === "") return;

      // Consultar la API para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      // Mostrar Spinner
      setCargando(true);

      // Ocultar Spinner y mostrar resultado
      setTimeout(() => {
        // Cargar el estado de cargando
        setCargando(false);

        // Guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    };
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // Mostrar Spinner o resultado
  const Componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {Componente}
      </div>
    </Contenedor>
  );
}

export default App;
