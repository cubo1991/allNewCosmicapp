
import { db } from "@/app/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, query, onSnapshot } from "firebase/firestore";


// Crear una acción asíncrona
export const fetchAliens = createAsyncThunk('aliens/fetchAliens', async (_, { dispatch }) => {
    try {
        const q = query(collection(db, 'alienList'));
        onSnapshot(q, (querySnapshot) => {
            const alienList = [];
            querySnapshot.forEach((doc) => {
                alienList.push(doc.data());
            });
            dispatch(addAliens(alienList));
            localStorage.setItem( alienList, JSON.stringify(alienList) )
        });
    } catch (error) {
        console.error("Error fetching aliens: ", error);
        // Aquí puedes manejar el error como prefieras
    }
});


const alienListSlice = createSlice({
    name: 'list',
    initialState: { list: [] },
    reducers: {
        addAliens: (state, action) => {
            state.list = action.payload;
           
        }
    }
});

export const { addAliens } = alienListSlice.actions;
export default alienListSlice.reducer;
