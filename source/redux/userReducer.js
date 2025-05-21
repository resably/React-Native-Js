import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/axiosConfig";

export const register = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/register', userData);
        const { access_token, refresh_token, user } = response.data.data;

        await AsyncStorage.setItem('accessToken', access_token);
        await AsyncStorage.setItem('refreshToken', refresh_token);

        return {
            token: access_token,
            refreshToken: refresh_token,
            user
        };
    } catch (error) {
        console.log('register error', error);
        return rejectWithValue(error.response.data.error);
    }
});

export const login = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/login', userData);
        const { access_token, refresh_token, user } = response.data.data;

        await AsyncStorage.setItem('accessToken', access_token);
        await AsyncStorage.setItem('refreshToken', refresh_token);

        return {
            token: access_token,
            refreshToken: refresh_token,
            user
        };
    }
    catch (error) {
        console.log('login error', error);
        return rejectWithValue(error.response.data.error);
    }
});

export const logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = await AsyncStorage.getItem("accessToken");
            if (!accessToken) throw new Error("Token bulunamadı");

            const response = await api.post("/auth/logout", null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("refreshToken");

            return response.data.message;

        } catch (err) {
            console.log("logout error", err);
            return rejectWithValue(err.message);
        }
    }
);

export const autoLogin = createAsyncThunk('user/autoLogin', async (_, { rejectWithValue }) => {

    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
        console.log('No refresh token found');
        return rejectWithValue('No refresh token found');
    }
    try {
        const response = await api.post('/auth/autologin', { token: refreshToken, })
        const { access_token, refresh_token, user } = response.data.data;

        await AsyncStorage.setItem('accessToken', access_token);
        await AsyncStorage.setItem('refreshToken', refresh_token);

        return {
            token: access_token,
            refreshToken: refresh_token,
            user
        };
    }
    catch (error) {
        console.log('autoLogin error', error);
        return;
    }
});


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
        builder
            .addCase(register.pending, (state) => {
                state.isAuth = false;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuth = true;
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(register.rejected, (state, action) => {
                state.isAuth = false;
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isAuth = false;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuth = false;
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.isAuth = true;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false;
                state.isLoading = false;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isAuth = true;
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(autoLogin.pending, (state) => {
                state.isAuth = false;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.isAuth = true;
                state.isLoading = false;
                state.user = action.payload.user;
                console.log('accesstoken:', action.payload.token);
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { } = userSlice.actions;
export default userSlice.reducer;
