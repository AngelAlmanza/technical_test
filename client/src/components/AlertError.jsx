import { Alert, Fade } from '@mui/material'
import { useEffect, useState } from 'react'

export const AlertError = ({ text }) => {
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Fade in={fade} timeout={{
      enter: 300,
      exit: 500,
    }}>
      <Alert severity="error">
        {text}
      </Alert>
    </Fade>
  )
}
