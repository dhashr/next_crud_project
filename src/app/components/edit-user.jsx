"use client";
import React from "react";
import BreadCrumb from "./bread-crumb";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const breadCrumb = [
  { title: "Home", url: "../" },
  { title: "Edit User", url: "../edit/" },
];

const EditUser = ({ id }) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: async () => {
      const { user } = await getUser(id);
      return user;
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`../api/${id}/`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setErrorMsg(true);
        setMsg("Failed to update user");
        setSeverity("error")
        throw new Error("Failed to update user");
      }

      const { message } = await res.json();
      setErrorMsg(true);
      setMsg(message);
      setSeverity("success")
      router.push("../");
    } catch (error) {
      setErrorMsg(true);
      setMsg(error);
      setSeverity("error")
    }
  };

  const getUser = async (id) => {
    try {
      const res = await fetch(`../api/${id}`);
      if (!res.ok) {
        setErrorMsg(true);
        setMsg("Failed to fetch user");
        setSeverity("error")
        throw new Error("Failed to fetch user");
      }

      setErrorMsg(true);
      setMsg("Successfully fetched the user");
      setSeverity("success")
      return await res.json();
    } catch (error) {
      setErrorMsg(true);
      setMsg(error);
      setSeverity("error")
    }
  };

  return (
    <div>
      <BreadCrumb lists={breadCrumb} />
      <h4 className="mb-2">Edit User</h4>
      <div className="mb-2">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  className="form-control"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone_no" className="form-label">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  {...register("phone_no", { required: true })}
                />
              </div>
              <div className="mb-3 text-end">
                <input type="submit" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
      {
        errorMsg ?
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="outlined" severity={severity}>
              {msg}
            </Alert>
          </Stack>
        : ""
      }
    </div>
  );
};

export default EditUser;
