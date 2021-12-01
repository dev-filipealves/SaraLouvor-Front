import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Box from "@mui/material/Box";

export default function EscalaCard(props) {
  function formatDate(date) {
    let options = { month: "long", year: "numeric" };
    let d = new Date(date);
    return (Number(d.getDate()) < 10 ? "0" + d.getDate() : d.getDate()) + " " + d.toLocaleDateString("pt-BR", options);
  }

  function removeHours(today) {
    today.setHours(0,0,0,0);
    return today;
  }

  function getColor() {
    var color = "#FED2AA";
    switch (props.title) {
      case "Culto de Terça":
        color = "#80bfff";
        break;
      case "Vigilia":
        color = "#99e699";
        break;
      case "Arena Jovem":
        color = "#ff8080";
        break;
      case "Culto da Família - Manhã":
        color = "#FED2AA";
        break;
      case "Culto da Família - Noite":
        color = "#FED2AA";
        break;
      case "Evento | Revisão de Vidas":
        color = " #ff9933";
        break;
      case "Evento | Renovo":
        color = "#ffffcc";
        break;
      case "Evento | TAL":
        color = "#FED2AA";
        break;
      case "Evento | TAC":
        color = "#ccccff";
        break;
      default:
        color = "#b3cccc";
    }

    if (removeHours(props.date) < removeHours(new Date())) {
      color = "#CCD0CD";
    }

    return color;
  }

  return (
    <Card sx={{ maxHeight: 500, maxWidth: 350, minWidth: 350, boxShadow: 3 }}>
      {removeHours(props.date) < removeHours(new Date()) ? (
        <>
        <CardHeader
          style={{ textAlign: "center", backgroundColor: "#86B98E" }}
          title={<b style={{color: "white", fontSize: "60%"}}>{props.title} <b stytle={{color: "orange"}}>(ESCALA CUMPRIDA)</b></b>}
          subheader={<div style={{color: "white"}}>{formatDate(props.date)}</div>}
        />
          
        </>
      ) : (
        <CardHeader
          /* avatar={<Avatar sx={{ bgcolor: "#ff8c00" }} aria-label="recipe"></Avatar>} */ style={{ textAlign: "center", backgroundColor: getColor() }}
          title={<b style={{ fontSize: "80%" }}>{props.title}</b>}
          subheader={formatDate(props.date)}
        />
      )}

      {/* #FED2AA */}
      <CardContent style={{ backgroundColor: getColor() }}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableBody>
              <TableRow key="min" style={{ height: 1, backgroundColor: "#d9d9d9" }} hover>
                <TableCell component="th" scope="row" style={{ height: "auto !important" }}>
                  <b>Ministro</b>
                </TableCell>
                <TableCell align="center">{props.ministro && props.ministro === "Nenhum" ? "--" : props.ministro}</TableCell>
              </TableRow>
              <TableRow key="bacj" style={{ height: 1 }} hover>
                <TableCell component="th" scope="row">
                  <b>Back</b>
                </TableCell>
                <TableCell align="center">{props.back && props.back === "Nenhum" ? "--" : props.back}</TableCell>
              </TableRow>
              <TableRow key="teclado" style={{ height: 1 }} hover>
                <TableCell component="th" scope="row">
                  <b>Teclado</b>
                </TableCell>
                <TableCell align="center">{props.teclado && props.teclado === "Nenhum" ? "--" : props.teclado}</TableCell>
              </TableRow>
              <TableRow key="viol" style={{ height: 1 }} hover>
                <TableCell component="th" scope="row">
                  <b>Violão/Guita</b>
                </TableCell>
                <TableCell align="center">{props.violao && props.violao === "Nenhum" ? "--" : props.violao}</TableCell>
              </TableRow>
              <TableRow key="b" style={{ height: 1 }} hover>
                <TableCell component="th" scope="row">
                  <b>Baixo</b>
                </TableCell>
                <TableCell align="center">{props.baixo && props.baixo === "Nenhum" ? "--" : props.baixo}</TableCell>
              </TableRow>
              <TableRow key="bat" style={{ height: 1 }} hover>
                <TableCell component="th" scope="row">
                  <b>Bateria</b>
                </TableCell>
                <TableCell align="center">{props.bateria && props.bateria === "Nenhum" ? "--" : props.bateria}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      {props.isAdmin ? (
        <CardActions style={{ backgroundColor: getColor() }}>
          <b>Configurações:</b>
          <Button color="primary" style={{ marginLeft: "auto" }} aria-label="showmore">
            <ManageAccountsIcon />
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
