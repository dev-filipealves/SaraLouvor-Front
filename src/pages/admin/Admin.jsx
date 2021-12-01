
//import Avatar from '@mui/material/Avatar';
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Axios from "axios";
import React, { useState, useEffect } from "react";

 function Admin() {
  const history = useHistory();
  const [data, setData] = useState(['']);


  const defaulData = [
    { item: "Musicos", value: 12 },
    { item: "Vocais", value: 45 },
    { name: "Administradores", value: 50 },
  ];

  const [chartUsers, setChartUsers] = useState(defaulData);

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_SERVER}/admin`,
    }).then((res) => {
      if (res.data) {
        setData(res.data);
        if (!res.data.loggedUser && res.data.loggedUser != null) {
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
      setData(['']);
      history.push("/login");
    });
  }

  const getCharts = () => {
    
    /*data.allUsers.map((usr) => {
        if (usr.userProfile === "musico") {
            chartUsers[0].value++;
        }
        if (usr.userProfile === "vocal") {
            chartUsers[1].value++;
        }
        if (usr.userProfile === "admin") {
            chartUsers[2].value++;
        }
    }); */
  }

  useEffect(() => {
    getUser();
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
              {chartUsers[1].item}
            </Button>
          </>
        ) : null
      ) : null}
    </>
  );
}

export default Admin;
