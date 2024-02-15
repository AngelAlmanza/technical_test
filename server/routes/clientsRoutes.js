import { Router } from 'express'
import { createClient, deleteClient, getClient, getClients, updateClient } from '../controllers/ClientsController.js'
import { validateCreateClient, validateUpdateClient } from '../validators/clients.js'

const clientsRouter = Router()

// Get all clients
clientsRouter.get('/', getClients)

// Get a client by id
clientsRouter.get('/:id', getClient)

// Create a new client
clientsRouter.post('/', validateCreateClient, createClient)

// Update a client by id
clientsRouter.put('/:id', validateUpdateClient, updateClient)

// Delete a client by id
clientsRouter.delete('/:id', deleteClient)

export default clientsRouter
