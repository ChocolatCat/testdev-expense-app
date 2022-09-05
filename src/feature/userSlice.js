import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {auth, googleAuthProvider} from '../firebase/firebase';
import { signInWithRedirect, signOut } from 'firebase/auth';

export const login = createAsyncThunk('user/login', 
async (arg, thunkAPI) => {
    signInWithRedirect(auth, googleAuthProvider).then((result) => {
        return true;
    });
});

export const logout = createAsyncThunk('user/logout', 
async (arg, thunkAPI) => {
    signOut(auth).then(() => {
        return false;
    });
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogged: false,
        uid: undefined
    },
    reducers: {
        setLogStatus(state, {payload}) {
            state.isLogged = payload;
        },
        setUid(state, {payload}){
            state.uid = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, {payload}) => {
            state.isLogged = payload;
        }),
        builder.addCase(login.rejected, (state, {payload}) => {
            state.isLogged = payload;
        });
    }
});

export const { setLogStatus, setUid } = userSlice.actions;

export default userSlice.reducer;