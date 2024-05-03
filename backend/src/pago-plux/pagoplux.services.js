const { default: axios } = require("axios");
const PagoPlux = require("./pagoplux.model");

class PagoPluxServices {
  static async findAll() {
    return await PagoPlux.findAll();
  }

  static async create(data) {
    return await PagoPlux.create(data);
  }

  static async login(email, password) {
    const user = await PagoPlux.findOne({ where: { email, password } });
    return user;
  }

  static async getTransactions(
    numeroIdentificacion,
    initialDate,
    finalDate,
    tipoPago,
    estado,
    identificacionCliente
  ) {
    try {
      const response = await axios.post(
        "https://api.pagoplux.com/intv1/integrations/getTransactionsEstablishmentResource",
        {
          numeroIdentificacion,
          initialDate,
          finalDate,
          tipoPago,
          estado,
          identificacionCliente,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              "o3NXHGmfujN3Tyzp1cyCDu3xst:TkBhZQP3zwMyx3JwC5HeFqzXM4p0jzsXp0hTbWRnI4riUtJT"
            ).toString("base64")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PagoPluxServices;
