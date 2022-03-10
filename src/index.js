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

export const Survezy = ({ path, link, sx, darkMode }) => {
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

  const handleFinish = (answers) => {
    setSurvey(null)

    axios
      .post(`http://35.154.113.16/survey/response/${survey.path}`, {
        answers
      })
      .catch((e) => console.log(e))
  }

  if (survey === null) return null

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Slide in direction='up' sx={{ position: 'fixed', ...sx }}>
        <Root>
          <Box>
            <Survey questions={survey.questions} onFinish={handleFinish} />
          </Box>
        </Root>
      </Slide>
    </ThemeProvider>
  )
}

// const DropDownOptions = ({ options, answer, setAnswer }) => (
//   <FormControl className={styles.form_control}>
//     <RadioGroup
//       value={answer ?? ''}
//       onChange={(e) => setAnswer(e.target.value)}
//     >
//       {options.map((option, index) => (
//         <FormControlLabel
//           key={index}
//           value={index}
//           control={<Radio />}
//           label={option}
//           className={styles.option_box}
//         />
//       ))}
//     </RadioGroup>
//   </FormControl>
// )

// const MultipleChoiceOptions = ({ options, answer, setAnswer }) => {
//   const handleSubmit = (checked, index) => {
//     const answers = answer?.split('') ?? new Array(options.length).fill('0')
//     answers[index] = checked ? '1' : '0'

//     answers.every((a) => a === '0')
//       ? setAnswer(undefined)
//       : setAnswer(answers.join(''))
//   }

//   return (
//     <FormGroup className={styles.form_control}>
//       {options.map((option, index) => (
//         <Box key={index}>
//           <FormControlLabel
//             key={index}
//             control={
//               <Checkbox
//                 checked={answer?.[index] === '1'}
//                 onChange={(e) => handleSubmit(e.target.checked, index)}
//                 autoFocus
//               />
//             }
//             label={option}
//           />
//         </Box>
//       ))}
//     </FormGroup>
//   )
// }

// const EmojiRatingOptions = ({ answer, setAnswer }) => {
//   return (
//     <div>
//       {[
//         'emojione:angry-face',
//         'emojione:frowning-face',
//         'emojione:neutral-face',
//         'emojione:slightly-smiling-face',
//         'emojione:grinning-face'
//       ].map((emoji, index) => (
//         <IconButton key={index} onClick={() => setAnswer(index.toString())}>
//           <Icon icon={emoji} width='40' height='40' />
//         </IconButton>
//       ))}
//     </div>
//   )
// }

// const ShortAnswerOptions = ({ answer, setAnswer }) => {
//   return (
//     <TextField
//       fullWidth
//       label='Answer'
//       maxRows={1}
//       value={answer ?? ''}
//       onChange={(e) => setAnswer(e.target.value)}
//     />
//   )
// }

// const ParagraphOption = ({ answer, setAnswer }) => {
//   return (
//     <TextField
//       fullWidth
//       multiline
//       label='Answer'
//       rows={3}
//       value={answer ?? ''}
//       onChange={(e) => setAnswer(e.target.value)}
//     />
//   )
// }

// const RatingOptions = ({ answer, setAnswer }) => (
//   <Rating
//     value={answer ? answer + 1 : 0}
//     onChange={(_, newValue) => {
//       newValue && setAnswer(newValue - 1)
//     }}
//     size='large'
//   />
// )

// const SliderOptions = ({ answer, setAnswer }) => (
//   <Slider
//     value={answer ?? 0}
//     step={1}
//     marks
//     max={10}
//     onChange={(e, newValue) => newValue && setAnswer(newValue)}
//   />
// )

// const Options = ({ type, options, answer, setAnswer }) => {
//   if (type === 'RATING')
//     return <RatingOptions answer={answer} setAnswer={setAnswer} />

//   if (type === 'SCALE')
//     return <SliderOptions answer={answer} setAnswer={setAnswer} />

//   if (type === 'DROPDOWN')
//     return (
//       <DropDownOptions
//         options={options}
//         answer={answer}
//         setAnswer={setAnswer}
//       />
//     )

//   if (type === 'MULTIPLE_CHOICE')
//     return (
//       <MultipleChoiceOptions
//         options={options}
//         answer={answer}
//         setAnswer={setAnswer}
//       />
//     )

//   if (type === 'EMOJI_RATING')
//     return <EmojiRatingOptions answer={answer} setAnswer={setAnswer} />

//   if (type === 'SHORT_ANSWER')
//     return <ShortAnswerOptions answer={answer} setAnswer={setAnswer} />

//   if (type === 'PARAGRAPH')
//     return <ParagraphOption answer={answer} setAnswer={setAnswer} />

//   return null
// }

// const SurveyController = ({ isLastQuestion, onNext, onSubmit }) => {
//   if (isLastQuestion)
//     return (
//       <div>
//         <Button
//           variant='contained'
//           onClick={onSubmit}
//           className={styles.survezy_button}
//         >
//           Submit
//         </Button>
//       </div>
//     )

//   return (
//     <div>
//       <Button
//         variant='contained'
//         onClick={onNext}
//         className={styles.survezy_button}
//       >
//         Next
//       </Button>
//     </div>
//   )
// }
