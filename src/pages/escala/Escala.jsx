import React, { useState, useEffect, useRef } from "react";
//import Avatar from '@mui/material/Avatar';
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Zoom from "@mui/material/Zoom";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EscalaCard from "../../Components/EscalaCard";
import Axios from "axios";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CadEscala from "../../Components/CadEscala";

const theme = createTheme();

export default function Escala() {
  const history = useHistory();
  const [data, setData] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [monthOpen, setMonthOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  function getData(props) {
    let now = new Date();
    let options = { month: "long" };
    Axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_SERVER}/escalas`,
      params: { mes: props && props.mes ? props.mes : now.toLocaleDateString("pt-BR", options) },
    }).then((res) => {
      if (res.data) {
        setData(res.data);
      } else {
        console.log("SEM RESPOSTA");
      }
    });
  }


  function sortByDate(array) {
    let list = array;
     list.sort(function(a,b){
      return new Date(a.data).getDate() > new Date(b.data).getDate() ? 1 : -1;  
    });
    return list;
  }
  /*   
    MOBILE CHECK
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    } 
    
    PUT IT IN useEffect() {

      /*     window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    } 
    }*/

  /* 
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
 */
  useEffect(() => {
    let now = new Date();
    let options = { month: "long" };
    setSelectedMonth(now.toLocaleDateString("pt-BR", options));
    getData();
  }, []);

  return (
    <>
      {data ? (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xg">
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid
                container
                spacing={2}
                style={{
                  marginTop: "1px",
                  justifyContent: "center",
                }}
              >
                {data && data.loggedUser ? (
                  <Grid item style={{ marginTop: "1%" }}>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        setDialogOpen(true);
                      }}
                    >
                      Adicionar Escala
                    </Button>
                  </Grid>
                ) : (
                  <Grid item style={{ marginTop: "1%" }}>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        history.push("/login");
                      }}
                    >
                      Fazer Login
                    </Button>
                  </Grid>
                )}
                {dialogOpen ? (
                  <CadEscala
                    onClose={(e) => {
                      setDialogOpen(false);
                    }}
                    onSucess={(e) => {
                      getData({ mes: selectedMonth });
                    }}
                  />
                ) : null}
                <Grid item>
                  <FormControl sx={{ m: 1, minWidth: 240 }}>
                    <InputLabel id="demo-controlled-open-select-label">Mês</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={monthOpen}
                      onOpen={(e) => {
                        setMonthOpen(true);
                      }}
                      onClose={(e) => {
                        setMonthOpen(false);
                      }}
                      value={selectedMonth}
                      label="month"
                      onChange={(e) => {
                        setSelectedMonth(e.target.value);
                        getData({ mes: e.target.value });
                      }}
                    >
                      <MenuItem value="janeiro">Janeiro</MenuItem>
                      <MenuItem value="fevereiro">Fevereiro</MenuItem>
                      <MenuItem value="marco">Março</MenuItem>
                      <MenuItem value="abril">Abril</MenuItem>
                      <MenuItem value="maio">Maio</MenuItem>
                      <MenuItem value="junho">Junho</MenuItem>
                      <MenuItem value="julho">Julho</MenuItem>
                      <MenuItem value="agosto">Agosto</MenuItem>
                      <MenuItem value="setembro">Setembro</MenuItem>
                      <MenuItem value="outubro">Outubro</MenuItem>
                      <MenuItem value="novembro">Novembro</MenuItem>
                      <MenuItem value="dezembro">Dezembro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Stack /* direction={width <= 768 ? "column" : "row"} */ direction={{ xs: "column", sm: "row" }} justifyContent="center" alignItems="flex-start" spacing={1}>
                {sortByDate(data.escala).map((key) => {
                  return (
                    <Zoom in={data.escala} style={{ transitionDelay: data.escala.length ? "500ms" : "0ms" }}>
                      <div>
                        <EscalaCard
                          isAdmin={data.loggedUser && (data.loggedUser.userProfile === "lider" || data.loggedUser.userProfile === "admin")}
                          ministro={key.escalados.ministro}
                          back={key.escalados.back}
                          teclado={key.escalados.teclado}
                          violao={key.escalados.violao}
                          baixo={key.escalados.baixo}
                          bateria={key.escalados.bateria}
                          title={key.culto}
                          date={new Date(key.data)}
                        />
                      </div>
                    </Zoom>
                  );
                })}
              </Stack>

              {/* <div>
                <Grid
                 
                  container
                  spacing={2}
                  style={{
                    marginTop: "1px",
                    width: "102%",
                    display: "flex",
                    justifyContent: "center",
                    direction: "row",
                  }}
                >
                  {data.escala.map((key) => {
                    return (
                      <Grow in={key.culto} style={{ transformOrigin: "0 0 0" }} {...(key.culto.length ? { timeout: 1000 } : {})}>
                        <Grid item>
                          <EscalaCard
                            isAdmin={data.loggedUser && (data.loggedUser.userProfile === "lider" || data.loggedUser.userProfile === "admin")}
                            ministro={key.escalados.ministro}
                            back={key.escalados.back}
                            teclado={key.escalados.teclado}
                            violao={key.escalados.violao}
                            baixo={key.escalados.baixo}
                            bateria={key.escalados.bateria}
                            title={key.culto}
                            date={new Date(key.data)}
                          />
                        </Grid>
                      </Grow>
                    );
                  })}
                </Grid>
              </div> */}
            </Box>
          </Container>
        </ThemeProvider>
      ) : (
        <CircularProgress color="inherit" />
      )}
    </>
  );
}
