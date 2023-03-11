import React, { useEffect, useState } from "react";
import { getAllFlowers } from "../api/api";
import Grid from "@mui/material/Grid";
import FlowerCard from "./FlowerCard";
import Button from "@mui/material/Button";
import { UseEvent, UseEventUpdate } from "../context/EventContext";
import { updateEvent } from "../api/api";
const FlowerDesign = () => {
  const event = UseEvent();
  const eventUpdate = UseEventUpdate();
  const [flowers, setFlowers] = useState([]);
  const [choosedFlowers, setChoosedFlowers] = useState([]);
  const fetchFlowers = async () => {
    const flowersData = await getAllFlowers();
    setFlowers(flowersData);
  };
  useEffect(() => {
    fetchFlowers();
  }, []);
  const handleSubmit = async () => {
    const changeEvent = { ...event };
    changeEvent.flowers = choosedFlowers;
    const updatedEvent = await updateEvent(event.id, changeEvent);
    eventUpdate(updatedEvent);
  };
  return (
    <Grid container>
      {flowers &&
        flowers.map((flower, index) => {
          return (
            <FlowerCard
              key={index}
              flower={flower}
              choosedFlowers={choosedFlowers}
              setChoosedFlowers={setChoosedFlowers}
            ></FlowerCard>
          );
        })}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
        Set Flower Design
      </Button>
    </Grid>
  );
};

export default FlowerDesign;
