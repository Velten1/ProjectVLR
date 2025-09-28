import api from "../api/api.js"

export const guessAgent = async (userData) => {
    return await api.post("quiz/guessAgent", userData);
}