import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://127.0.0.1:8000";

const API = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchSuggestions = async (payload) => {
    return await API.post(`/suggestions`, payload);
}

export const fetchCharts = async (symbol) => {
    return await API.get(`/charts/${symbol}`);
}