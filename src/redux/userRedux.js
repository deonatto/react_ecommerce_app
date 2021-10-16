import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        error: false
    },
    reducers: {
        loginSuccess: (state,action)=>{
            state.error = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state)=>{
            state.error = true;
        },
        logout:(state)=>{
            state.currentUser = null;
        }
        
    }
});

export const {loginFailure, loginSuccess,logout} = userSlice.actions;
export default userSlice.reducer;