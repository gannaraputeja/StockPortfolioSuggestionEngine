import axios from "axios";

const API_BASE_URL = process.env.BACKEND_API_URL || "http://127.0.0.1:8000";
const STOCK_API_KEY = process.env.STOCK_API_KEY;

const API = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchSuggestions = async (payload) => {
    return await API.post(`/suggestions`, payload);
}

export const fetchCharts = async (symbol) => {
    return await axios.get(`https://cloud.iexapis.com/v1/stock/${symbol}/chart/1m?token=${STOCK_API_KEY}`);
}