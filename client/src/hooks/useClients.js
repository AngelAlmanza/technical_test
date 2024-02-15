import { useEffect, useState } from "react"
import { createClient, deleteClient, getClients, updateClient } from "../api/clientsApi"

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.'

export const useClients = () => {
  const [clients, setClients] = useState([])
  const [errors, setErrors] = useState([])

  const onDelete = (id) => {
    deleteClient(id)
      .then(resp => {
        if (resp.status === 204) {
          setClients(clients.filter(client => client.id !== id))
        }
      })
      .catch(error => {
        const cachedErrors = error.response.data.errors.map(e => e.msg)
        setErrors(cachedErrors || DEFAULT_ERROR_MESSAGE)
      })
  }

  const onUpdate = (client) => {
    updateClient(client)
      .then(updatedClient => {
        const updatedClients = clients.map(c => {
          if (c.id === updatedClient.id) {
            return updatedClient
          }
          return c
        })
        setClients(updatedClients)
      })
      .catch(error => {
        const cachedErrors = error.response.data.errors.map(e => e.msg)
        setErrors(cachedErrors || DEFAULT_ERROR_MESSAGE)
      })
  }

  const onCreate = (client) => {
    createClient(client)
      .then(createdClient => {
        setClients([...clients, createdClient])
      })
      .catch(error => {
        const cachedErrors = error.response.data.errors.map(e => e.msg)
        setErrors(cachedErrors || DEFAULT_ERROR_MESSAGE)
      })
  }

  useEffect(() => {
    getClients()
      .then(clients => setClients(clients))
      .catch(error => {
        const cachedErrors = error.response.data.errors.map(e => e.msg)
        setErrors(cachedErrors || DEFAULT_ERROR_MESSAGE)
      })
  }, [])

  return {
    clients,
    errors,
    onDelete,
    onUpdate,
    onCreate,
  }
}
