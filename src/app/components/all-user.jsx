"use client";
import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const AllUsers = () => {
  const [rows, setRows] = useState([]);
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await fetch("/api/");
        if (!res.ok) {
          setErrorMsg(true);
          setMsg("Error fetching users");
          setSeverity("error")
          throw new Error("Error fetching users");
        }

        const { users } = await res.json();
        setRows(users);
        setErrorMsg(true);
        setMsg("Error fetching users");
        setSeverity("success")
      } catch (error) {
        setErrorMsg(true);
        setMsg(error);
        setSeverity("error")
      }
    }
    getAllUsers();
  }, []);
  return (
    <>
      <DataTable rows={rows} />
      {
        errorMsg ?
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="outlined" severity={severity}>
              {msg}
            </Alert>
          </Stack>
        : ""
      }
    </>
  )
};

export default AllUsers;
