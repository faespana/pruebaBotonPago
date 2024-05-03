import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [tipoPago, setTipoPago] = useState("unico");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleTipoPagoChange = (event) => {
    setTipoPago(event.target.value);
  };

  const handleInitialDateChange = (event) => {
    setInitialDate(event.target.value);
  };

  const handleFinalDateChange = (event) => {
    setFinalDate(event.target.value);
  };

  const fetchTransactions = async () => {
    const requestBody = {
      numeroIdentificacion: "0992664673001",
      initialDate,
      finalDate,
      tipoPago,
      estado: "pagado",
      identificacionCliente: "09199223221",
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/transactions",
        requestBody
      );
      console.log(response.data.transactions.detail);
      setTransactions(response.data.transactions.detail.transactionsData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div
      id="payment"
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="center-container">
        <div className="splash-container d-flex justify-content-center">
          <div id="ButtonPaybox"></div>
        </div>
        <div className="px-5 mx-5 mt-4">
          <p className="text-center">
            <strong>Fecha Inicial</strong>
          </p>
          <input
            type="date"
            className="form-control mb-2 text-center"
            value={initialDate}
            onChange={handleInitialDateChange}
          />
          <p className="text-center">
            <strong>Fecha Final</strong>
          </p>
          <input
            type="date"
            className="form-control mt-2 text-center"
            value={finalDate}
            onChange={handleFinalDateChange}
          />
        </div>
        <div className="dropdown mt-4 d-flex justify-content-around">
          <select
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            value={tipoPago}
            onChange={handleTipoPagoChange}
          >
            <option value="unico">Pago Único</option>
            <option value="recurrente">Pago Recurrente</option>
          </select>
          <button
            type="button"
            className="btn btn-primary"
            onClick={fetchTransactions}
          >
            Obtener Transacciones
          </button>
        </div>
        <div className="container text-center mt-4">
          <div className="row g-3">
            {transactions &&
              transactions.map((transaction, index) => (
                <div className="card col-12 col-md-6 col-lg-4" key={index}>
                  <p>
                    <strong>Fecha de Transacción:</strong>{" "}
                    {transaction.fecha_transaccion}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {transaction.descripcion}
                  </p>
                  <p>
                    <strong>Monto:</strong> {transaction.monto}
                  </p>
                  <p>
                    <strong>Estado de Transacción:</strong>{" "}
                    {transaction.estado_transaccion}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
