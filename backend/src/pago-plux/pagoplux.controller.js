const PagoPluxServices = require("./pagoplux.services");

const findAll = async (req, res) => {
  const pagoPlux = await PagoPluxServices.findAll();
  return res.status(200).json({
    message: "Get Method",
    pagoPlux,
  });
};

const createOne = async (req, res) => {
  const { name, email, password } = req.body;

  const pagoPlux = await PagoPluxServices.create({
    name,
    email,
    password,
  });

  return res.status(201).json({
    message: "Post Method",
    data: pagoPlux,
  });
};

const createLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await PagoPluxServices.login(email, password);

  if (user) {
    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } else {
    return res.status(401).json({
      message: "Login failed",
    });
  }
};

const getTransactions = async (req, res) => {
  const {
    numeroIdentificacion,
    initialDate,
    finalDate,
    tipoPago,
    estado,
    identificacionCliente,
  } = req.body;

  const requestBody = {
    numeroIdentificacion,
    initialDate,
    finalDate,
    tipoPago,
    estado,
    identificacionCliente,
  };

  try {
    const transactions = await PagoPluxServices.getTransactions(requestBody);
    return res.status(200).json({
      message: "Transactions retrieved successfully",
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving transactions",
      error: error.message,
    });
  }
};

module.exports = {
  findAll,
  createOne,
  createLogin,
  getTransactions,
};
