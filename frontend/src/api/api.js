import axios from "axios";

const API = axios.create({
    baseURL: process.env.API_URL,
});

export const fetchSuggestions = async (payload) => {
    return await axios.post(`/suggestions`, payload);
}