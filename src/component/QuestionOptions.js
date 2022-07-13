import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  ListItem,
  Radio,
  Checkbox,
  OutlinedInput,
  Slider
} from '@mui/material'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import styled from '@emotion/styled'

export const QuestionOptions = ({
  options,
  answer,
  questionType,
  setAnswer
}) => {
  if (questionType === 'RATING') return <RatingOptions setAnswer={setAnswer} />

  if (questionType === 'SCALE') return <ScaleOptions setAnswer={setAnswer} />

  if (questionType === 'PARAGRAPH')
    return <ParagraphOptions answer={answer} setAnswer={setAnswer} />

  if (questionType === 'SHORT_ANSWER')
    return <ShortAnswerOptions answer={answer} setAnswer={setAnswer} />

  if (questionType === 'EMOJI_RATING')
    return <EmojiRatingOptions setAnswer={setAnswer} />

  if (questionType === 'MULTIPLE_CHOICE')
    return (
      <MultipleChoiceOptions
        options={options}
        answer={answer}
        setAnswer={setAnswer}
      />
    )

  if (questionType === 'DROPDOWN')
    return <DropDownOptions options={options} setAnswer={setAnswer} />
}

const MultipleChoiceOptions = ({ options, answer, setAnswer }) => {
  const handleCheckedChange = (index, checked) => {
    const updatedChecks =
      answer?.split('') ?? new Array(options.length).fill('0')

    updatedChecks[index] = checked ? '1' : '0'

    const allUnchecked = updatedChecks.every((c) => c === '0')

    setAnswer(allUnchecked ? undefined : updatedChecks.join(''))
  }

  return (
    <div>
      {options.map((option, index) => (
        <Paper variant='outlined' key={index} sx={{ py: 1, my: 1 }}>
          <Stack direction='row'>
            <Checkbox
              onChange={(e) => handleCheckedChange(index, e.target.checked)}
              checked={answer?.[index] === '1'}
            />
            <Typography
              variant='legend'
              sx={{ fontFamily: 'Fredoka', fontSize: 15, my: 'auto' }}
            >
              {option}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </div>
  )
}

const DropDownOptions = ({ options, setAnswer }) => {
  return (
    <div>
      {options.map((option, index) => (
        <Paper variant='outlined' key={index} sx={{ py: 1, my: 1 }}>
          <Stack direction='row'>
            <Radio onChange={() => setAnswer(index.toString())} />
            <Typography
              variant='legend'
              sx={{ fontFamily: 'Fredoka', fontSize: 15, my: 'auto' }}
            >
              {option}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </div>
  )
}

const EmojiRatingOptions = ({ setAnswer }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    {[
      'emojione:angry-face',
      'emojione:frowning-face',
      'emojione:neutral-face',
      'emojione:slightly-smiling-face',
      'emojione:grinning-face'
    ].map((emoji, index) => (
      <ListItem key={index} sx={{ m: 0, p: 0 }}>
        <IconButton onClick={() => setAnswer(index.toString())}>
          <Icon icon={emoji} width='40' height='40' />
        </IconButton>
      </ListItem>
    ))}
  </Box>
)

const ShortAnswerOptions = ({ answer, setAnswer }) => {
  return (
    <OutlinedInput
      size='small'
      fullWidth
      placeholder='Answer'
      maxRows={1}
      value={answer ?? ''}
      onChange={(e) => setAnswer(e.target.value)}
      sx={{
        typography: 'subtitle1',
        fontFamily: 'Acme'
      }}
    />
  )
}

const ParagraphOptions = ({ answer, setAnswer }) => {
  return (
    <OutlinedInput
      size='small'
      fullWidth
      placeholder='Answer'
      multiline
      rows={3}
      value={answer ?? ''}
      onChange={(e) => setAnswer(e.target.value)}
      sx={{
        typography: 'subtitle1',
        fontFamily: 'Acme'
      }}
    />
  )
}

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow
      }
    }
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none'
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000'
    }
  },
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf'
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor'
    }
  }
}))

const ScaleOptions = ({ setAnswer }) => {
  const [value, setValue] = useState(0)
  const marks = [
    {
      value: 0,
      label: '1',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10',
    },
    // {
    //   value: 100,
    //   label: '100°C',
    // },
  ];
  return (
    <IOSSlider
      value={value}
      min={0}
      max={10}
      marks={marks}
      onChange={(e, newValue) => newValue && setValue(newValue)}
      valueLabelDisplay='auto'
      onChangeCommitted={() => setAnswer(value.toString())}
    />
  )
}

const RatingOptions = ({ setAnswer }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    {Array(5)
      .fill('noto:star')
      .map((emoji, index) => (
        <ListItem key={index} sx={{ m: 0, p: 0 }}>
          <IconButton onClick={() => setAnswer(index.toString())}>
            <Icon icon={emoji} width='40' height='40' />
          </IconButton>
        </ListItem>
      ))}
  </Box>
)
