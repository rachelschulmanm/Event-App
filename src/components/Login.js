import  React  from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Controller, useForm } from "react-hook-form";
import {getAllUsers } from "../api/api";
// import { UserContext } from "../App";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
import * as yup from "yup";
import {UseUser,UseUserUpdate} from '../context/UserContext'

YupPassword(yup);


const Login = ({handleClose}) => {

  const user = UseUser()
  const updateUser=UseUserUpdate()
  console.log(updateUser)

  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().password(),
    })
    .required();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const users = await getAllUsers();
    const result = users.filter((user) => {
      return user.email === data.email && user.password === data.password;
    });
    console.log(result);
    if (result.length) {
      updateUser(result[0]);
      console.log(user);
      handleClose()
      alert("you are logged in");
      localStorage.setItem('user', JSON.stringify(result[0].id));

    } else {
      alert("no such a user");
    }
  };

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              name={"email"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={onChange}
                  value={value}
                  error={errors.email?.message}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name={"password"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={onChange}
                  value={value}
                  error={errors.password?.message}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
            <Button
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={() => reset()}
              variant={"outlined"}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Container>
  );
};
export default Login;
