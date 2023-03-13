import React, { useState } from "react";
import { ReactComponent as TableIcon } from "../icons/tableBig.svg";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {  Draggable } from "react-beautiful-dnd";

const Table = ({ position, setPlan,index }) => {
  const [tableGroupName, setTableGroupName] = useState("");
  const changeValue = (e) => {
    setTableGroupName(e.target.value);
    let key = position.toString();

    setPlan((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const grid = 8;
const color=Math.floor(index*1677725).toString(16);
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : `#${color}`,

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  return (
    <Draggable key={index} draggableId={index.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Stack direction="column" spacing={1}>
            <p> table number {index}</p>
            <TableIcon></TableIcon>
            <TextField
              style={{ width: 150, top: -50, left: 30 }}
              value={tableGroupName}
              hiddenLabel
              id="filled-hidden-label-small"
              helperText="enter group name"
              variant="filled"
              size="small"
              onChange={changeValue}
            />
          </Stack>
        </div>
      )}
    </Draggable>
  );
};

export default Table;
