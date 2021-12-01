import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DesktopDatePicker";
import DateFnsUtils from "@date-io/date-fns";
import ptBR from "date-fns/locale/pt-BR";


export default function CadEscala(props) {
  const [open, setOpen] = useState(true);
  const [culto, setCulto] = useState("Culto de Terça");
  const [data, setData] = useState(new Date());
  const [evento, setEvento] = useState();
  const [datePickerOpen, setDatePickerOpen] = useState();
  const [ministro, setMinistro] = useState();
  const [back, setBack] = useState();
  const [teclado, setTeclado] = useState();
  const [violao, setViolao] = useState();
  const [baixo, setBaixo] = useState();
  const [bateria, setBateria] = useState();
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleSubmit = () => {
    if (!ministro) {
      setMinistro("error");
    } else if (!back) {
      setBack("error");
    } else if (!teclado) {
      setTeclado("error");
    } else if (!violao) {
      setViolao("error");
    } else if (!baixo) {
      setBaixo("error");
    } else if (!bateria) {
      setBateria("error");
    } else if (!dateError) {
      setLoading(true);
      Axios({
        method: "POST",
        withCredentials: true,
        url: `${process.env.REACT_APP_BACKEND_SERVER}/escalas`,
        params: {
          culto: culto,
          data: data.$d ? data.$d : data,
          evento: evento,
          ministro: ministro,
          back: back,
          teclado: teclado,
          violao: violao,
          baixo: baixo,
          bateria: bateria,
        },
      }).then((res) => {
        if (res.data) {
          setData(res.data);
          if (res.data === "sucess") {
            setLoading(false);
            props.onClose();
            props.onSucess();
          }
        }
      });
    }
  };

  const handleClose = () => {
    props.onClose();
    setLoading(false);
  };


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle style={{ textAlign: "center" }}>Cadastrar nova escala</DialogTitle>
        <DialogContent>
          <DialogContentText>Lider, preencha todos os dados para adicionar um dia na escala do louvor.</DialogContentText>
          <FormControl sx={{ minWidth: "100%", marginTop: "2%" }}>
            <InputLabel id="cultoevent">Culto</InputLabel>
            <Select
              labelId="cultoevent"
              /* open={monthOpen} */
              value={culto}
              label="month"
              onChange={(e) => {
                setCulto(e.target.value);
              }}
              required
            >
              <MenuItem value="Culto de Terça">Culto de Terça</MenuItem>
              <MenuItem value="Vigilia">Vigilia</MenuItem>
              <MenuItem value="Arena Jovem">Arena Jovem</MenuItem>
              <MenuItem value="Culto da Família - Manhã">Culto da Familia - Manhã</MenuItem>
              <MenuItem value="Culto da Família - Noite">Culto da Familia - Noite</MenuItem>
              <MenuItem value="Evento | Revisão de Vidas">Evento | Revisão de Vidas</MenuItem>
              <MenuItem value="Evento | Renovo">Evento | Renovo</MenuItem>
              <MenuItem value="Evento | TAL">Evento | TAL</MenuItem>
              <MenuItem value="Evento | TAC">Evento | TAC</MenuItem>
              {/* <MenuItem value="Evento">Evento</MenuItem> */}
            </Select>

            <div>
              {culto && culto === "Evento" ? (
                <>
                  <TextField
                    label="Nome do Evento"
                    variant="outlined"
                    onChange={(e) => {
                      setEvento(e.target.value);
                    }}
                    sx={{ minWidth: "100%", marginTop: "4%" }}
                  />
                </>
              ) : null}
            </div>

            <LocalizationProvider dateAdapter={DateFnsUtils} locale={ptBR}>
              <DatePicker
                openTo="day"
                open={datePickerOpen}
                onOpen={(e, newValue) => {
                  setDatePickerOpen(true);
                }}
                onClose={(e) => {
                  setDatePickerOpen(false);
                }}
                mask="__/__/____"
                label="Data"
                value={data}
                onChange={(newValue) => {
                  setData(newValue);
                  if ((newValue && newValue.$d == "Invalid Date") || !newValue) {
                    setDateError(true);
                  } else {
                    setDateError(false);
                  }
                }}
               
                sx={{ minWidth: "100%" }}
                renderInput={(params) => <TextField {...params} sx={{ marginTop: "4%" }} value={null}  error={dateError}/>}
              />
            </LocalizationProvider>
            <Autocomplete
              onChange={(e, value) => {
                if (value) {
                  setMinistro(value.label);
                }
              }}
              options={ministros}
              noOptionsText="Sem Opções"
              sx={{ minWidth: "100%", marginTop: "4%" }}
              renderInput={(params) => <TextField {...params} label="Ministro" error={ministro === "error"} />}
            />
            <Autocomplete
              onChange={(e, value) => {
                if (value) {
                  setBack(value.label);
                }
              }}
              freeSolo={true}
              options={backs}
              sx={{ minWidth: "100%", marginTop: "4%" }}
              renderInput={(params) => <TextField {...params} label="Back" error={back === "error"} />}
            />
            <Autocomplete
              onChange={(e, value) => {
                if (value) {
                  setTeclado(value.label);
                }
              }}
              freeSolo={true}
              options={musicos}
              sx={{ minWidth: "100%", marginTop: "4%" }}
              renderInput={(params) => <TextField {...params} label="Teclado" error={teclado === "error"} />}
            />
            <Autocomplete
              onChange={(e, value) => {
                if (value) {
                  setViolao(value.label);
                }
              }}
              freeSolo={true}
              options={musicos}
              sx={{ minWidth: "100%", marginTop: "4%" }}
              renderInput={(params) => <TextField {...params} label="Violão/Guitarra" error={violao === "error"} />}
            />
            <Autocomplete
              onChange={(e, value) => {
                if (value) {
                  setBaixo(value.label);
                }
              }}
              freeSolo={true}
              options={musicos}
              sx={{ minWidth: "100%", marginTop: "4%" }}
              renderInput={(params) => <TextField {...params} label="Baixo" error={baixo === "error"} />}
            />
            <Autocomplete
              onChange={(e, value) => {
                if (value) {
                  setBateria(value.label);
                }
              }}
              freeSolo={true}
              options={musicos}
              sx={{ minWidth: "100%", marginTop: "4%" }}
              renderInput={(params) => <TextField {...params} label="Bateria" error={bateria === "error"} />}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            SAIR
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            ADICIONAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const ministros = [{ label: "Alessandro" }, { label: "Charles" }, { label: "David" }, { label: "Diego" }, { label: "Diovana" }, { label: "Misael" }];
const backs = [{ label: "Nenhum" }, { label: "Arieli" }, { label: "David" }, { label: "Diovana" }, { label: "Erick" }, { label: "Luana" }, { label: "Gian" }, { label: "Raissa" }];
const musicos = [{ label: "Nenhum" }, { label: "Alisson" }, { label: "David" }, { label: "Eduardo" }, { label: "Erick" }, { label: "Filipe" }, { label: "Gian" }, { label: "Vinicius" }];
