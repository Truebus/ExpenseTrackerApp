import axios from "axios";

const BASE_URL = "http://localhost:4000";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

export const Create = async(expensedata) =>{
    const data = await api.post("/api/expense/create", expensedata);

    return data.data;
}

export const Fetch =async()=>{
    const data = await api.get(`/api/expense/getdata`);
    return data.data;
}

export const DeleteData = async(id)=>{
    const data = await api.delete(`/api/expense/deletedata/${id}`);
    return data.data;
}