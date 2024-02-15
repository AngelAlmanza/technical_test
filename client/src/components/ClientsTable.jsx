import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { ClientForm } from "./ClientForm";
import { useState } from "react";
import styled from "@emotion/styled";

const createClient = () => {
  return {
    name: '',
    email: '',
    phone: '',
  }
}

export const ClientsTable = ({ clients, onDelete, onUpdate, onCreate }) => {
  const [open, setOpen] = useState(false)
  const [clientRef, setClientRef] = useState(null)

  const onOpen = (client) => {
    if (client) {
      setClientRef(client)
    }
    setOpen(true)
  }

  const onClose = () => {
    setClientRef(null)
    setOpen(false)
  }

  const callback = (client) => {
    if (client.id) {
      onUpdate(client)
    } else {
      onCreate(client)
    }
  }

  const Caption = styled('caption')({})

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Clients Table">
        <Caption>
          <Button variant="outlined" color="info" onClick={() => onOpen(createClient())}>Add Client</Button>
        </Caption>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.id}
              >
                <TableCell component="th" scope="row">
                  {client.name}
                </TableCell>
                <TableCell align="right">{client.email}</TableCell>
                <TableCell align="right">{client.phone}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDelete(client.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      startIcon={<EditIcon />}
                      onClick={() => onOpen(client)}
                    >
                      Edit
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        open && (
          <ClientForm
            client={clientRef}
            open={open}
            closeModal={onClose}
            cb={callback}
          />
        )
      }
    </>
  );
}
