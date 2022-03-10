import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grow,
  IconButton
} from '@mui/material'
import React, { useEffect, useReducer } from 'react'
import { Icon } from '@iconify/react'
import { PoweredBy } from './component/PoweredBy'
import { QuestionOptions } from './component/QuestionOptions'

const notAutoNext = ['PARAGRAPH', 'MULTIPLE_CHOICE', 'SHORT_ANSWER']

const surveyReducer = (state, { type, payload }) => {
  if (type === 'answer') {
    const answers = [...state.answers]
    answers[payload.questionIndex] = payload.answer

    const isLastQuestion =
      state.currentQuestionIndex === state.questions.length - 1

    const shouldMove = !notAutoNext.includes(payload.questionType)

    const updateQuestionIndex =
      state.currentQuestionIndex + (!isLastQuestion && shouldMove ? 1 : 0)

    return {
      ...state,
      answers,
      currentQuestionIndex: updateQuestionIndex,
      completed: isLastQuestion && shouldMove
    }
  }

  if (type === 'next') {
    const isLastQuestion =
      state.currentQuestionIndex === state.questions.length - 1

    return {
      ...state,
      currentQuestionIndex:
        state.currentQuestionIndex + (isLastQuestion ? 0 : 1),
      completed: isLastQuestion
    }
  }

  return state
}

export const Survey = ({ questions, onFinish }) => {
  const [state, dispatch] = useReducer(surveyReducer, {
    questions,
    answers: [],
    currentQuestionIndex: 0,
    completed: false
  })

  useEffect(() => {
    if (state.completed) handleSubmit()
  }, [state.completed])

  const handleSubmit = () => {
    const answers = state.questions.map((_, i) =>
      state.answers[i] ? state.answers[i].toString() : null
    )

    onFinish(answers)
  }

  const hideAction =
    state.questions.length - 1 === state.currentQuestionIndex &&
    !notAutoNext.includes(state.questions[state.currentQuestionIndex].type)

  return (
    <Card>
      <CardHeader
        subheader={state.questions[state.currentQuestionIndex].text}
        subheaderTypographyProps={{
          fontFamily: 'Acme'
        }}
        action={
          !hideAction && (
            <IconButton onClick={() => dispatch({ type: 'next' })}>
              <Icon icon='bx:right-arrow-circle' width='32' height='32' />
            </IconButton>
          )
        }
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[700]
        }}
      />

      <CardContent>
        <div>
          <Grow
            key={state.currentQuestionIndex}
            in
            style={{ transformOrigin: '0 0 0' }}
            timeout={700}
          >
            <div>
              <QuestionOptions
                questionType={state.questions[state.currentQuestionIndex].type}
                options={state.questions[state.currentQuestionIndex].options}
                answer={state.answers[state.currentQuestionIndex]}
                setAnswer={(answer) => {
                  dispatch({
                    type: 'answer',
                    payload: {
                      questionIndex: state.currentQuestionIndex,
                      answer,
                      questionType:
                        state.questions[state.currentQuestionIndex].type
                    }
                  })
                }}
              />
            </div>
          </Grow>
        </div>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <PoweredBy />
      </CardActions>
    </Card>
  )
}
