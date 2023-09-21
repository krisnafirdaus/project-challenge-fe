"use client";

import React from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import { Provider } from "react-redux";
import store from "../store";

const IndexPage: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto">
        <div className="text-center py-10">
          <h1 className="text-4xl">User Management Dashboard</h1>
        </div>
        <UserForm />
        <UserList />
      </div>
    </Provider>
  );
};

export default IndexPage;
