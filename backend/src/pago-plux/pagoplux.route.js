const express = require("express");
const router = express.Router();

const {
  findAll,
  createOne,
  createLogin,
  getTransactions,
} = require("./pagoplux.controller");

/**
 * @openapi
 * /api/v1/pagoplux:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users from the database
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/pagoplux", findAll);

/**
 * @openapi
 * /api/v1/signup:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Ingreso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuario creado exitosamente
 *       '400':
 *         description: Error en la solicitud del cliente
 *       '500':
 *         description: Error interno del servidor
 */

router.post("/signup", createOne);

/**
 * @openapi
 * /api/v1/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags:
 *       - Ingreso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuario autenticado exitosamente
 *       '400':
 *         description: Error en la solicitud del cliente
 *       '401':
 *         description: Credenciales de usuario inválidas
 *       '500':
 *         description: Error interno del servidor
 */

router.post("/login", createLogin);

/**
 * @openapi
 * /api/v1/transactions:
 *   post:
 *     summary: Obtener transacciones
 *     tags:
 *       - Transacciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroIdentificacion:
 *                 type: string
 *               initialDate:
 *                 type: string
 *                 format: date
 *               finalDate:
 *                 type: string
 *                 format: date
 *               tipoPago:
 *                 type: string
 *               estado:
 *                 type: string
 *               identificacionCliente:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Transacciones recuperadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 transactions:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: number
 *                     description:
 *                       type: string
 *                     detail:
 *                       type: object
 *                       properties:
 *                         transactionsData:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Transaction'
 *                         resultCount:
 *                           type: number
 *       '400':
 *         description: Error en la solicitud del cliente
 *       '401':
 *         description: No autorizado
 *       '500':
 *         description: Error interno del servidor
 */

router.post("/transactions", getTransactions);

module.exports = router;
