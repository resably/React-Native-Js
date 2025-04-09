import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    }
});

export const { } = userSlice.actions;
export default userSlice.reducer;
