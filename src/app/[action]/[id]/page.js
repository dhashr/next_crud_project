import AddUser from "@/app/components/add-user";
// import DeleteUser from "@/app/components/delete-user";
import EditUser from "@/app/components/edit-user";
import React from "react";

const ActionUserId = ({ params }) => {
  const { action, id } = params;
  switch (action) {
    case "add":
      return <AddUser />;
    case "edit":
      return <EditUser id={id} />;
  }
};

export default ActionUserId;
