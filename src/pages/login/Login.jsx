import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
require('dotenv').config() 

const theme = createTheme();

function Login() {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [sendValues, setSendValues] = useState();
  const [tryLogin, setTryLogin] = useState(false);
  const [reCaptcha, setRecaptcha] = useState(false);

  function handleSubmit() {
    if (reCaptcha) {
      setTryLogin(true);
      Axios({
        method: "POST",
        data: {
          username: sendValues.username,
          password: sendValues.password,
        },
        withCredentials: true,
        url: `${process.env.REACT_APP_BACKEND_SERVER}/login`,
      }).then((res) => {
        if (res.data) {
          setData(res.data);
          console.log(res.data);
          if (res.data.loggedUser) {
            history.push("/escala");
          }
        } else {
          history.push("/login");
        }
        setTryLogin(false);
      });
    } else {
      setData({ error: "Faça o reCaptcha" });
    }
  }

  function handleVerify(value) {
    setRecaptcha(true);
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setSendValues({
      ...sendValues,
      [name]: value,
    });

    if (data && data.error) {
      setData({ ...data, error: null });
    }
    console.log(`${process.env.REACT_APP_BACKEND_SERVER}/login`);
  }

  return (
    <div style={{backgroundColor: "paper"}}>
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
            <img src="../logo.png" width={"70%"} height={"50%"} alt="teste" />
            {data ? (
              data.error ? (
                <Alert
                  style={{ position: "absolute", top: "8%" }}
                  severity="error"
                >
                  {data.error}
                </Alert>
              ) : null
            ) : null}
            <Box
              component="form"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email"
                name="username"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleVerify}
              ></ReCAPTCHA>
              {tryLogin ? (
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    <CircularProgress
                      style={{ marginRight: "4%" }}
                      size={20}
                      color="inherit"
                    />
                    Entrar
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Entrar
                  </Button>
                </div>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    Não tem uma conta? Registre-se
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Login;
