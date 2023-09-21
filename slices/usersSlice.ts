import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { username: string; firstName: string; lastName: string };

const initialState: User[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => action.payload,
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.findIndex(
        (user) => user.username === action.payload.username
      );
      if (index !== -1) state[index] = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user.username !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
