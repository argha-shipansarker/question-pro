import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserInfoState {
    name: string;
    email: string;
}

const initialState: UserInfoState = {
    name: "Argha Shipan Sarker",
    email: "arghasarker55@gmail.com"
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        updateName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
    },
})

export const { updateName, updateEmail } = userInfoSlice.actions

export default userInfoSlice.reducer