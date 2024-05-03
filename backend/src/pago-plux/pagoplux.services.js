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

  static async getTransactions(requestBody) {
    try {
      const { data } = await axios.post(
        "https://apipre.pagoplux.com/intv1/integrations/getTransactionsEstablishmentResource",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(
              "o3NXHGmfujN3Tyzp1cyCDu3xst:TkBhZQP3zwMyx3JwC5HeFqzXM4p0jzsXp0hTbWRnI4riUtJT"
            ).toString("base64")}`,
          },
        }
      );
      return data;
    } catch (error) {
      throw new Error("Error fetching transactions: " + error.message);
    }
  }
}

module.exports = PagoPluxServices;
