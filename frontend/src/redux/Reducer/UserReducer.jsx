
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { changePassword, createUser, deleteUser, loginUser } from "../../server/api";

const initialState = {
    email: null,
    username : null,
    userIsLogin: false,
    status: null,
    error: {
        email: null,
        password : null,
    }   
};

// login
export const signIn = createAsyncThunk(
    "auth/login",
    async (body) => {
        var response;
        await loginUser(body).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err.response.data;
        })
        return response;
    }
)
// createUser
export const userCreate = createAsyncThunk(
    "user/create",
    async (body) => {
        var response;
        await createUser(body).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err.response.data;
        })
        return response;
    }
)
// forgot password 
export const forgot = createAsyncThunk(
    "user/forgot",
    async (body) => {
        var response;
        await login(body).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err.response.data;
        })
        return response;
    }
)
// change password
export const passwordChange = createAsyncThunk(
    "user/changepassword",
    async ({email,body}) => {
        var response;
        await changePassword(email,body).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err.response.data;
        })
        return response;
    }
)
// delete user
export const userDelete = createAsyncThunk(
    "user/delete",
    async (id) => {
        var response;
        await deleteUser(id).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err.response.data;
        })
        return response;
    }
)

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            console.log("kokspd")
            console.log(action);
        }).addCase(userCreate.fulfilled, (state, action) => {
            console.log(action.payload);
        }).addCase(forgot.fulfilled, (state, action) => {
            console.log(action.payload);
        }).addCase(passwordChange.fulfilled, (state, action) => {
            console.log(action.payload);
        }).addCase(userDelete.fulfilled, (state, action) => {
            console.log(action.payload);
        })
    }

})
export default userReducer.reducer;