import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
import * as yup from "yup";
import { addUser } from "../api/api";
YupPassword(yup);

const theme = createTheme();

const SignUp = () => {
  const schema = yup
    .object()
    .shape({
      fullName: yup.string().required(),
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
      fullName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      console.log(data);
      await addUser(data);
      alert("you are signed up");
    } catch (e) {}
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              name={"fullName"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoFocus
                  onChange={onChange}
                  value={value}
                  error={errors.fullName?.message}
                  helperText={errors.fullName?.message}
                />
              )}
            />

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
                  error={errors.password?.message ? true : false}
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
              Sign Up
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
    </ThemeProvider>
  );
};
export default SignUp;
