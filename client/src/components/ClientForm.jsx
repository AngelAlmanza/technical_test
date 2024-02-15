import { Backdrop, Box, Button, Fade, Modal, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export const ClientForm = ({ open, closeModal, cb, client }) => {
  const [clientForm, setClientForm] = useState(client || {
    name: '',
    email: '',
    phone: '',
  })

  const onSave = () => {
    cb(clientForm)
    closeModal()
  }

  useEffect(() => {
    if (client) {
      setClientForm(client)
    }
  }, [client])

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '50%'},
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          component: 'form',
        }}>
          <div>
            <Typography variant="h4" gutterBottom>
              {
                clientForm.id
                  ? 'Edit Client'
                  : 'Add New Client'
              }
            </Typography>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              defaultValue={clientForm.name}
              onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              id="email"
              label="E-mail"
              defaultValue={clientForm.email}
              onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
              margin="normal"
            />
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone Number"
              defaultValue={clientForm.phone}
              onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
              margin="normal"
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="contained" color="error" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="contained" color="success" onClick={onSave}>
                Save
              </Button>
            </Stack>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}
