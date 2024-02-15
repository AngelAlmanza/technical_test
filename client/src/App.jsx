import { Box, Container, Typography } from "@mui/material"
import { ClientsTable } from "./components/ClientsTable"
import { useClients } from "./hooks/useClients"
import { AlertError } from "./components/AlertError"

export const App = () => {
  const { clients, errors, onDelete, onUpdate, onCreate } = useClients()

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >
      <Typography variant="h1" align="center" gutterBottom>
        Clients
      </Typography>
      <Box>
        <ClientsTable clients={clients} onDelete={onDelete} onUpdate={onUpdate} onCreate={onCreate} />
      </Box>
      <Box sx={{my: 2}}>
        {
          errors.map((error) => (
            <AlertError key={crypto.randomUUID()} text={error} />
          ))
        }
      </Box>
    </Container>
  )
}

export default App
