import { Box, Slide, createTheme, ThemeProvider, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import './index.css'
import { Survey } from './Survey'

const lightTheme = createTheme()

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const Root = styled('div')(({ theme }) => ({
  position: 'fixed',
  width: 369,
  right: 0,
  bottom: 0,
  [theme.breakpoints.down('md')]: {
    left: 0,
    margin: 'auto'
  },
  [theme.breakpoints.up('md')]: {
    margin: '20px'
  }
}))

export const Survezy = ({ path, link, sx, darkMode }) => {
  const [survey, setSurvey] = useState(null)
  const [slideIn, setSlideIn] = useState(true)

  useEffect(() => {
    const surveyEndpoint = path
      ? `survey/details/${path}`
      : `container/survey/${link}`

    axios
      .get(`https://35.154.113.16/${surveyEndpoint}`)
      .then((response) => setSurvey(response.data))
      .catch((e) => console.log(e))
  }, [path, link])

  const handleFinish = (answers) => {
    setSlideIn(false)

    axios
      .post(`https://35.154.113.16/survey/response/${survey.id}`, {
        answers
      })
      .catch((e) => console.log(e))
  }

  if (survey === null) return null

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Slide
        in={slideIn}
        timeout={1000}
        direction='up'
        sx={{ position: 'fixed', ...sx }}
      >
        <Root>
          <Box>
            <Survey questions={survey.questions} onFinish={handleFinish} />
          </Box>
        </Root>
      </Slide>
    </ThemeProvider>
  )
}
