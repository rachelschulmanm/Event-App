import React, { useState, useEffect, useCallback } from "react";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StyledBadge, StyledBadgeUser } from "./StyledComponent";
import { addEvent, getAllEvents } from "../api/api";
import { UseUser } from "../context/UserContext";
import { UseEventUpdate } from "../context/EventContext";
export default function MaterialUIPickers() {
  const user = UseUser();
  const updateEvent = UseEventUpdate();
  //INITIAL DATE
  const [value, setValue] = useState(new Date());
  const [type, setType] = useState(1);
  // ALL FUTERED SCEDULED EVENTS
  const [sceduledEvents, setSceduledEvents] = useState([]);
  // ALL USERS EVEVNTS
  const [userEvents, setUserEvents] = useState([]);
  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const filterByDate = (event) => {
    return event.dateEvent >= new Date().toISOString();
  };
  const filterByUser = (event) => {
    return event.userId === user.id || event.userId === user.id?.toString();
  };

  const getAllUsersEvents = (events) => {
    const usersEventsSceduled = events
      .filter((event) => {
        return filterByUser(event);
      })
      .map((event) => event.dateEvent?.split("T")[0]);
    setUserEvents(usersEventsSceduled);
    console.log("user", usersEventsSceduled);
  };
  const getAllSceduledEvents = useCallback(async () => {
    //GET ALL EVENTS
    const events = await getAllEvents();
    getAllUsersEvents(events);
    const sceduledEvents = events
      .filter((event) => {
        return filterByDate(event);
      })
      .map((event) => event.dateEvent?.split("T")[0]);
    setSceduledEvents(sceduledEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getAllSceduledEvents();
  }, [getAllSceduledEvents]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const sceduleEvent = async () => {
    console.log(sceduledEvents, value);
    if (!sceduledEvents.includes(value)) {
      try {
        const event = {
          userId: user.id,
          type: type,
          dateEvent: value,
        };
        const newEvent = await addEvent(event);
        alert("added event");
        updateEvent(newEvent);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DesktopDatePicker
              disablePast={true}
              //   shouldDisableDate="false"
              label="Date desktop"
              inputFormat="DD/MM/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              renderDay={(day, _value, DayComponentProps) => {
                //CHECK IF sceduledEvents
                const isSelected =
                  !DayComponentProps.outsideCurrentMonth &&
                  sceduledEvents.includes(day.$d.toISOString().split("T")[0]);
                //CHECK IF userEvents
                const userSelected =
                  !DayComponentProps.outsideCurrentMonth &&
                  userEvents.includes(day.$d.toISOString().split("T")[0]);
                if (isSelected || userSelected) {
                  DayComponentProps.disabled = true;
                }
                return (
                  <React.Fragment key={day.$d.toISOString()}>
                    {userSelected ? (
                      <StyledBadgeUser
                        key={day.$d.toString()}
                        //overlap="circular"
                        badgeContent={" "}
                      ></StyledBadgeUser>
                    ) : isSelected ? (
                      <StyledBadge
                        key={day.$d}
                        //overlap="circular"
                        badgeContent={" "}
                      ></StyledBadge>
                    ) : null}
                    <PickersDay {...DayComponentProps} />
                  </React.Fragment>
                );
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Event Type"
                onChange={handleTypeChange}
              >
                <MenuItem value={1}>Wedding</MenuItem>
                <MenuItem value={2}>Bar Mitzva</MenuItem>
                <MenuItem value={3}>Brit Mila</MenuItem>
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              onClick={sceduleEvent}
              sx={{ mt: 3, mb: 2 }}
            >
              Schedule an Event{" "}
            </Button>
          </Stack>
        </LocalizationProvider>
      </form>
    </Box>
  );
}
