import { check, param } from 'express-validator'
import { validateResult } from '../helpers/validateHelper.js'
import Client from '../models/Client.js'

const validateCreateClient = [
  check('name')
    .exists()
    .not()
    .isEmpty(),
  check('email')
    .exists()
    .not()
    .isEmpty()
    .isEmail()
    .custom(async (value) => {
      const existingClient = await Client.findOne({ where: { email: value } })
      if (existingClient) {
        throw new Error('Email already in use')
      }
    }),
  check('phone')
    .exists()
    .not()
    .isEmpty()
    .isMobilePhone('es-MX', 'Invalid phone number')
    .custom(async (value) => {
      const existingClient = await Client.findOne({ where: { phone: value } })
      if (existingClient) {
        throw new Error('Phone already in use')
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateUpdateClient = [
  param('id')
    .exists()
    .not()
    .isEmpty()
    .isInt()
    .custom(async (value) => {
      const existingClient = await Client.findByPk(value)
      if (!existingClient) {
        throw new Error('Client not found')
      }
    }),
  check('name')
    .exists()
    .not()
    .isEmpty(),
  check('email')
    .exists()
    .not()
    .isEmpty()
    .isEmail()
    .custom(async (value, { req }) => {
      const existingClient = await Client.findOne({ where: { email: value } })
      if (existingClient && existingClient.id !== parseInt(req.params.id)) {
        throw new Error('Email already in use')
      }
    }),
  check('phone')
    .exists()
    .not()
    .isEmpty()
    .isMobilePhone('es-MX', 'Invalid phone number')
    .custom(async (value, { req }) => {
      const existingClient = await Client.findOne({ where: { phone: value } })
      if (existingClient && existingClient.id !== parseInt(req.params.id)) {
        throw new Error('Phone already in use')
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

export {
  validateCreateClient,
  validateUpdateClient
}
