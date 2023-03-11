import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "./Table";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { updateEvent } from "../api/api";
const SittingPlan = () => {
  const [amount, setAmount] = useState(0);
  const [plan, setPlan] = useState({});
  const setPlanSitting = async () => {
    let event = {
      sittingPlan: plan,
    };
    await updateEvent(1, event);
  };
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(plan);
    console.log(Array.from(Object.values(plan)));
    const items = Array.from(Object.values(plan));
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPlan(Object.assign({}, items));
    console.log(plan)
  }
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
  });
  useEffect(() => {
    let obj = {};
    for (let i = 0; i < amount; i++) {
      obj[i] = "";
    }
    setPlan(obj);
  }, [amount]);
  return (
    <>
      <Stack spacing={3}>
        <TextField
          value={amount}
          type="number"
          helperText="Please enter amount of tables"
          id="demo-helper-text-aligned"
          label="Amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </Stack>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tables">
          {(provided, snapshot) => (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Object.keys(plan).map((key, index) => {
                return <Table key={index} index={index} position={key} setPlan={setPlan}></Table>;
              })}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={setPlanSitting}
      >
        Set Sitting Plan
      </Button>
    </>
  );
};

export default SittingPlan;
