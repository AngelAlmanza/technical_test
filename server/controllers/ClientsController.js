import Client from '../models/Client.js'

const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll()
    res.status(200).json({ clients })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const getClient = async (req, res) => {
  const { id } = req.params
  try {
    const client = await Client.findByPk(id)
    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }
    res.status(200).json({ client })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const createClient = async (req, res) => {
  const { name, email, phone } = req.body
  try {
    const newClient = await Client.create({ name, email, phone })
    res.status(201).json({ client: newClient })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const updateClient = async (req, res) => {
  const { id } = req.params
  const { name, email, phone } = req.body
  try {
    const client = await Client.findByPk(id)
    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }
    client.name = name
    client.email = email
    client.phone = phone
    await client.save()
    res.status(200).json({ client })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const deleteClient = async (req, res) => {
  const { id } = req.params
  try {
    const client = await Client.findByPk(id)
    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }
    await client.destroy()

    res.status(204).json({ message: 'Client deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient
}
