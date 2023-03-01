import React, { useState } from "react";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

export default function MaterialUIPickers() {
  const [value, setValue] = useState(dayjs("2023-01-18T21:11:54"));
  const [takenDates, setTakenDates] = useState([
    new Date(2023, 0, 1).getDate(),
    new Date(2023, 1, 1).getDate(),
    new Date(2023, 7, 8).getDate(),
    new Date(2023, 6, 14).getDate(),
  ]);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const disableTakenDates = (date) => {
    date = date.$d;
    /* date interdites french format dd/mm for all year ! 
     01/01
     01/05
     08/08
     14/07
     15/08
     01/11
     11/11
     25/12 
     replace date.getFullYear() by the desired year otherwise
     */
    // in the following array format is us month are starting from 0 till 11

    /* make a new array with the getTime() without it date comparaison are 
     never true  */

    const formmatedDates = takenDates.map((arrVal) => {
      return arrVal.getTime();
    });

    /*exclude all sunday and use the includes array method to check if the 
     date.getTime() value is 
     in the array dateInterdites */

    return date.getDay() === 0 || formmatedDates.includes(date.getTime());
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid red`,
      padding: "0 4px",
    },
  }));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          //   shouldDisableDate="false"
          label="Date desktop"
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          // shouldDisableDate={disableTakenDates}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              takenDates.indexOf(day.date()) > 0;

            return (
              <>
                {" "}
                {isSelected ? (
                  <StyledBadge
                    key={day.toString()}
                    //overlap="circular"
                    badgeContent={""}
                  ></StyledBadge>
                ) : null}{" "}
                <PickersDay {...DayComponentProps} />
              </>
            );
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
