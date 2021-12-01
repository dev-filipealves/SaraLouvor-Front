import React, { useState, useEffect } from "react";
//import Avatar from '@mui/material/Avatar';
import { useHistory } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visto from "../../Components/Visto";
import Axios from "axios";

const theme = createTheme();

export default function Home() {
  const history = useHistory();
  const [data, setData] = useState();

  function getUsers() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_SERVER}/`,
    }).then((res) => {
      if (res.data) {
        setData(res.data);
        if (!res.data.loggedUser) {
          setData(res.data);
          history.push("/login");
        }
      }
    });
  }

  function handleLogout() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_SERVER}/logout`,
    }).then((res) => {
      setData(null);
      history.push("/login");
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {data ? (
        data.loggedUser ? (
          <>
            <Button
              onClick={handleLogout}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Logout
            </Button>
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
                  <img src="../logo.png" width={"60%"} alt="logo" />

                  <Visto />

                  <div>
                    {data ? (
                      <div>
                        {data.allUsers.map((usr) => {
                          return <div>{usr.username}</div>;
                        })}
                      </div>
                    ) : (
                      <CircularProgress color="inherit" />
                    )}
                  </div>
                </Box>
              </Container>
            </ThemeProvider>
          </>
        ) : null
      ) : null}
    </>
  );
}
