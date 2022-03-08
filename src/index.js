import {
  Box,
  Slide,
  FormGroup,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Rating,
  Slider,
  Typography,
  Button,
  IconButton,
  TextField
} from '@mui/material'
import { Icon } from '@iconify/react'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import styles from './styles.module.css'

const notAutoNext = ['PARAGRAPH', 'MULTIPLE_CHOICE', 'SHORT_ANSWER']

export const Survezy = ({ path, link, sx }) => {
  const [survey, setSurvey] = useState(null)

  useEffect(() => {
    const surveyEndpoint = path
      ? `survey/details/${path}`
      : `container/survey/${link}`

    axios
      .get(`http://35.154.113.16/${surveyEndpoint}`)
      .then((response) => setSurvey(response.data))
      .catch((e) => console.log(e))
  }, [path, link])

  if (survey === null) return null

  return (
    <Slide
      in
      direction='up'
      className={styles.survezy_box}
      sx={{ position: 'fixed', ...sx }}
    >
      <Box>
        <Survey
          path={survey.path}
          questions={survey.questions}
          onFinish={() => setSurvey(null)}
        />
        <Typography className={styles.watermark}>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; Powered by @<a href='https://google.com'>Survezy</a>
        </Typography>
      </Box>
    </Slide>
  )
}

const surveyReducer = (state, { type, payload }) => {
  if (type === 'answer') {
    const answers = [...state.answers]
    answers[payload.questionIndex] = payload.answer

    const shouldMove =
      state.currentQuestionIndex !== state.questions.length - 1 &&
      !notAutoNext.includes(payload.questionType)

    const updateQuestionIndex = state.currentQuestionIndex + (shouldMove ? 1 : 0)

    return {
      ...state,
      answers,
      error: '',
      currentQuestionIndex: updateQuestionIndex,
      showNext: notAutoNext.includes(state.questions[updateQuestionIndex].type)
    }
  }

  if (type === 'next') {
    const updatedQuestionIndex = state.currentQuestionIndex + 1

    return {
      ...state,
      currentQuestionIndex: updatedQuestionIndex,
      showNext: notAutoNext.includes(state.questions[updatedQuestionIndex].type)
    }
  }

  if (type === 'submitted') {
    return {
      ...state,
      submitted: true
    }
  }

  return state
}

const Survey = ({ path, questions, onFinish }) => {
  const [state, dispatch] = useReducer(surveyReducer, {
    questions,
    answers: [],
    currentQuestionIndex: 0,
    submitted: false,
    showNext: notAutoNext.includes(questions[0].type)
  })

  useEffect(() => {
    if (state.submitted) onFinish()
  }, [state.submitted])

  useEffect(() => {
    console.log(state)
  }, [state])

  const handleSubmit = () => {
    const answers = state.questions.map((_, i) =>
      state.answers[i] ? state.answers[i].toString() : null
    )

    axios
      .post(`http://35.154.113.16/survey/response/${path}`, {
        answers
      })
      .then(() => dispatch({ type: 'submitted' }))
      .catch((e) => console.log(e))
  }

  if (state.submitted) return <h1>Thanks</h1>

  return (
    <div>
      <QuestionTitle text={state.questions[state.currentQuestionIndex].text} />

      <Options
        type={state.questions[state.currentQuestionIndex].type}
        options={state.questions[state.currentQuestionIndex].options}
        answer={state.answers[state.currentQuestionIndex]}
        setAnswer={(answer) =>
          dispatch({
            type: 'answer',
            payload: {
              questionIndex: state.currentQuestionIndex,
              answer,
              questionType: state.questions[state.currentQuestionIndex].type
            }
          })
        }
      />

      {state.showNext && (
        <SurveyController
          isLastQuestion={
            state.currentQuestionIndex === state.questions.length - 1
          }
          onNext={() => dispatch({ type: 'next' })}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

const QuestionTitle = ({ text }) => (
  <Typography component='legend' className={styles.survezy_question}>
    {text}
  </Typography>
)

const DropDownOptions = ({ options, answer, setAnswer }) => (
  <FormControl className={styles.form_control}>
    <RadioGroup
      value={answer ?? ''}
      onChange={(e) => setAnswer(e.target.value)}
    >
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          value={index}
          control={<Radio />}
          label={option}
          className={styles.option_box}
        />
      ))}
    </RadioGroup>
  </FormControl>
)

const MultipleChoiceOptions = ({ options, answer, setAnswer }) => {
  const handleSubmit = (checked, index) => {
    const answers = answer?.split('') ?? new Array(options.length).fill('0')
    answers[index] = checked ? '1' : '0'

    answers.every((a) => a === '0')
      ? setAnswer(undefined)
      : setAnswer(answers.join(''))
  }

  return (
    <FormGroup className={styles.form_control}>
      {options.map((option, index) => (
        <Box key={index}>
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={answer?.[index] === '1'}
                onChange={(e) => handleSubmit(e.target.checked, index)}
                autoFocus
              />
            }
            label={option}
            className={styles.option_box}
          />
        </Box>
      ))}
    </FormGroup>
  )
}

const EmojiRatingOptions = ({ answer, setAnswer }) => {
  return (
    <div>
      {[
        'emojione:angry-face',
        'emojione:frowning-face',
        'emojione:neutral-face',
        'emojione:slightly-smiling-face',
        'emojione:grinning-face'
      ].map((emoji, index) => (
        <IconButton key={index} onClick={() => setAnswer(index.toString())}>
          <Icon icon={emoji} width='40' height='40' />
        </IconButton>
      ))}
    </div>
  )
}

const ShortAnswerOptions = ({ answer, setAnswer }) => {
  return (
    <TextField
      fullWidth
      label='Answer'
      maxRows={1}
      value={answer ?? ''}
      onChange={(e) => setAnswer(e.target.value)}
    />
  )
}

const ParagraphOption = ({ answer, setAnswer }) => {
  return (
    <TextField
      fullWidth
      multiline
      label='Answer'
      rows={3}
      value={answer ?? ''}
      onChange={(e) => setAnswer(e.target.value)}
    />
  )
}

const RatingOptions = ({ answer, setAnswer }) => (
  <Rating
    value={answer ? answer + 1 : 0}
    onChange={(_, newValue) => {
      newValue && setAnswer(newValue - 1)
    }}
    size='large'
  />
)

const SliderOptions = ({ answer, setAnswer }) => (
  <Slider
    value={answer ?? 0}
    step={1}
    marks
    max={10}
    onChange={(e, newValue) => newValue && setAnswer(newValue)}
  />
)

const Options = ({ type, options, answer, setAnswer }) => {
  if (type === 'RATING')
    return <RatingOptions answer={answer} setAnswer={setAnswer} />

  if (type === 'SCALE')
    return <SliderOptions answer={answer} setAnswer={setAnswer} />

  if (type === 'DROPDOWN')
    return (
      <DropDownOptions
        options={options}
        answer={answer}
        setAnswer={setAnswer}
      />
    )

  if (type === 'MULTIPLE_CHOICE')
    return (
      <MultipleChoiceOptions
        options={options}
        answer={answer}
        setAnswer={setAnswer}
      />
    )

  if (type === 'EMOJI_RATING')
    return <EmojiRatingOptions answer={answer} setAnswer={setAnswer} />

  if (type === 'SHORT_ANSWER')
    return <ShortAnswerOptions answer={answer} setAnswer={setAnswer} />

  if (type === 'PARAGRAPH')
    return <ParagraphOption answer={answer} setAnswer={setAnswer} />

  return null
}

const SurveyController = ({ isLastQuestion, onNext, onSubmit }) => {
  if (isLastQuestion)
    return (
      <div>
        <Button
          variant='contained'
          onClick={onSubmit}
          className={styles.survezy_button}
        >
          Submit
        </Button>
      </div>
    )

  return (
    <div>
      <Button
        variant='contained'
        onClick={onNext}
        className={styles.survezy_button}
      >
        Next
      </Button>
    </div>
  )
}
