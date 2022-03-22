import { Link, Typography } from '@mui/material'
import React from 'react'

export const PoweredBy = () => (
  <Typography
    align='center'
    sx={{
      fontSize: 12,
      color: '#c4c4c4',
      fontFamily: 'Acme'
    }}
  >
    Powered by @
    <Link
      color='primary'
      underline='hover'
      target='_blank'
      rel='noopener'
      href='https://survezy.in/'
    >
      Survezy
    </Link>
  </Typography>
)
