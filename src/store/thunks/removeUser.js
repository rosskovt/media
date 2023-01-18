import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "./fetchUsers";

const removeUser = createAsyncThunk('users/remove', async (user) => {
    const response = await axios.delete(`http://localhost:3005/users/${user.id}`);

    await pause(1000);

    //MAKE sure to return manually user's id as DELETE in JSON server returns an empty object. 
    //Return user or user.id
    return {
        response: response.data,
        id: user.id
    };
});

export { removeUser };