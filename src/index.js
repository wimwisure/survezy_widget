import { Box, Slide, createTheme, ThemeProvider } from '@mui/material'
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

export const Survezy = ({
  path,
  eventId,
  sx,
  darkMode,
  demoSurvey,
}) => {
  const [survey, setSurvey] = useState(demoSurvey)
  const [slideIn, setSlideIn] = useState(true)

  useEffect(() => {
    if (survey) console.log('start')
  }, [survey])

  useEffect(() => {
    if (!slideIn)
      setTimeout(() => {
        console.log('close')
      }, 1000)
  }, [slideIn])

  const fetchSurvey = () => {
    const surveyEndpoint = path
      ? `survey/details/${path}`
      : `container/survey/${eventId}`
    axios
      .get(`https://api.survezy.app/${surveyEndpoint}`)
      .then((response) => setSurvey(response.data))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    if (!demoSurvey) fetchSurvey()
    else setSurvey(demoSurvey)
  }, [demoSurvey, setSurvey])

  const postSurvey = (answers) => {
    setSlideIn(false)
    axios
      .post(`https://api.survezy.app/survey/response/${survey.id}`, {
        answers
      })
      .catch((e) => console.log(e))
  }

  const handleFinish = (answers) => {
    if (!demoSurvey) {
      postSurvey(answers)
    }
  }

  if (survey === null) return null

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Slide
        in={slideIn}
        key={demoSurvey ?? survey}
        timeout={1000}
        direction='up'
        sx={{ position: 'fixed', ...sx }}
      >
        <Root>
          <Box>
            {
              demoSurvey ? (
                <Survey
                  questions={demoSurvey.questions}
                  onFinish={handleFinish}
                  currentIndex={demoSurvey?.currentIndex}
                />
              ) : (
                <Survey
                  questions={survey.questions}
                  onFinish={handleFinish}
                />
              )
            }
          </Box>
        </Root>
      </Slide>
    </ThemeProvider>
  )
}
