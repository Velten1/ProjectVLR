import api from "../api/api.js";

export const guessQuote = async (userData) => {
    return await api.post("quotes/guessQuote", userData)
}

export const getDailyQuote = async () => {
    return await api.get("quotes/dailyquote")
}