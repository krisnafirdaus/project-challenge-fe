"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsers, deleteUser } from "../slices/usersSlice";
import { setError } from "../slices/uiSlice";
import EditUserForm from "./EditUserForm";
import Modal from "./Modal";

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users);
  const [editingUser, setEditingUser] = useState(null);
  const closeEditModal = () => setEditingUser(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        dispatch(setUsers(response.data));
      })
      .catch((error) => {
        dispatch(setError("Error fetching data"));
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  const handleDelete = (username: string) => {
    axios
      .delete(`http://localhost:3001/users/${username}`)
      .then(() => {
        dispatch(deleteUser(username));
      })
      .catch((error) => {
        dispatch(setError("Error deleting user"));
        console.error("Error deleting user:", error);
      });
  };

  console.log(users);

  return (
    <div className="space-y-4 mt-6">
      {editingUser && (
        <Modal onClose={closeEditModal}>
          <EditUserForm user={editingUser} onClose={closeEditModal} />
        </Modal>
      )}
      {users.map((user: any) => (
        <div
          key={user.username}
          className="flex items-center justify-between bg-gray-100 p-4 rounded"
        >
          <div className="flex">
            <div className="flex flex-col mr-6">
              <div>
                <p className="text-xs">First Name</p>
                <p>{user.firstName}</p>
              </div>
              <div className="mt-2">
                <p className="text-xs">Last Name</p>
                <p>{user.lastName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col">
                <p className="text-xs">Username</p>
                <p>{user.username}</p>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => handleDelete(user.username)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
            <button
              className="bg-green-500 text-white p-2 px-4 ml-2 rounded"
              onClick={() => setEditingUser(user)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
