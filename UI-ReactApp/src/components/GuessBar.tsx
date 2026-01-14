import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import 'dayjs/locale/en'
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import { useState } from "react";


interface GuessBarProps {
  submitGuess: (guessDate: Dayjs | null) => void;
}

const GuessBar = (
  {
    submitGuess,
  }: GuessBarProps
) => {
  const [guessDate, setGuessDate] = useState<Dayjs | null>(dayjs());

  return(
    <div>
      <p>This is the guess bar</p>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <DatePicker 
          label="Your Guess"
          minDate={dayjs("2020-01-01")}
          maxDate={dayjs("2020-12-31")}
          // defaultValue={dayjs("2020-08-07")}
          value={guessDate}
          onChange={v => {console.log("changed to ", v);setGuessDate(v)}}
        />
      </LocalizationProvider>
      <Button onClick={_e => {submitGuess(guessDate)}}>Guess</Button>
    </div>
  )
}


export default GuessBar;
