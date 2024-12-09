import * as React from 'react';
import Link from "next/link";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const cols = ["ID", "NAME", "EMAIL", "PHONE_NO", "ACTIONS"];

const DataTable = ({ rows = [] }) => {
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const handlerDelete = async (id) => {
    if (confirm("Are you sure you want to delete")) {
      try {
        const res = await fetch(`../api/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          setErrorMsg(true);
          setMsg("Couldn't delete");
          setSeverity("error")
          throw new Error("Couldn't delete");
        }

        const { message } = await res.json();
         setErrorMsg(true);
          setMsg(message);
          setSeverity("success")
      } catch (err) {
        setMsg(err)
        setErrorMsg(true)
        setSeverity("error")
      }
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            {cols.map((idx, i) => (
              <TableCell key={i}>{idx}</TableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone_no}</TableCell>
                <TableCell align="right">
                  <Link
                    className="btn btn-warning btn-sm"
                    href={`../edit/${tr?._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handlerDelete(tr?._id)}
                  >
                    Trash
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
  );
}

export default DataTable;