import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDialog from "./CustomDialog";
import { DrawerHeader, AppBar, Drawer } from "./StyledComponent";
import { ReactComponent as TableIcon } from "../icons/table.svg";
import { UseUser, UseUserUpdate } from "../context/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserById, deleteEventApi } from "../api/api";
import Alert from "./Alert";
import { UseEvent } from "../context/EventContext";
import "../css/style.css";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const theme = useTheme();
  const user = UseUser();
  const updateUser = UseUserUpdate();
  const event = UseEvent();
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [isLand, setIsLand] = useState(true);
  useEffect(() => {
    console.log(isLand);
  }, [isLand]);
  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleNavigate = (path) => {
    if (user.fullName) {
      navigate(path);
    } else {
      setAlert((prev) => !prev);
    }
  };
  const deleteLastEvent = async () => {
    console.log(event.id);
    if (event.id) {
      await deleteEventApi(event.id);
      setDeleteEvent(true);
    }
  };
  const fetchUserById = async (id) => {
    const userById = await getUserById(id);
    updateUser(userById);
  };
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));
    console.log(id);
    if (id) {
      fetchUserById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ display: "flex" }} className={isLand ? "main" : "none"}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Event App
          </Typography>
          {user.fullName ? (
            <>
              <span> Hello {user.fullName} !</span>
              <Button
                variant="danger"
                color="inherit"
                onClick={() => {
                  updateUser({});
                  localStorage.clear();
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  setLogin(false);
                  handleOpen();
                }}
              >
                Sign Up
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  setLogin(true);
                  handleOpen();
                }}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            key={"Pick a date"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                handleNavigate("/datePicker");
                setIsLand(false);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Pick a Date"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Sitting Plan"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                handleNavigate("/sittingPlan");
                setIsLand(false);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TableIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Sitting Plan"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Flower design"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                handleNavigate("/flowerDesign");
                setIsLand(false);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LocalFloristOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Flower design"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"delete"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                deleteLastEvent();
                setIsLand(false);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Delete last Event"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {isLand ? <span className="welcome">welcome to event app </span> : null}
        {
          //render the page selected by navigation
        }{" "}
        <Outlet></Outlet>
        {alert === true ? (
          <Alert
            text={"hey you need to Login first"}
            type="info"
            setAlert={setAlert}
          ></Alert>
        ) : null}
        {deleteEvent === true ? (
          <Alert
            text={"Delete Event Succesfuly"}
            type="success"
            setAlert={setAlert}
          ></Alert>
        ) : null}
      </Box>
      <CustomDialog
        open={openDialog}
        handleClose={handleClose}
        isLogin={login}
      ></CustomDialog>
    </Box>
  );
}
