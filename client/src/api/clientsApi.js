import axios from "axios"

const baseURL = "http://localhost:3000/api/clients";

const clientsApi = axios.create({
  baseURL,
})

export const getClients = async () => {
  const response = await clientsApi.get("/")
  if (response.status !== 200) {
    throw new Error("Failed to fetch clients")
  }
  const clients = response.data.clients
  return clients
}

export const getClient = async (id) => {
  const response = await clientsApi.get(`/${id}`)
  if (response.status !== 200) {
    throw new Error("Failed to fetch client")
  }
  const client = response.data.client
  return client
}

export const createClient = async (client) => {
  console.log('client', client)
  const response = await clientsApi.post("/", client, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 201) {
    throw new Error("Failed to create client")
  }
  const createdClient = response.data.client
  console.log('createdClient', createdClient)
  return createdClient
}

export const updateClient = async (client) => {
  const response = await clientsApi.put(`/${client.id}`, client, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (response.status !== 200) {
    throw new Error("Failed to update client")
  }
  const updatedClient = response.data.client
  return updatedClient
}

export const deleteClient = async (id) => {
  const response = await clientsApi.delete(`/${id}`)
  if (response.status !== 204) {
    throw new Error("Failed to delete client")
  }
  return response
}
