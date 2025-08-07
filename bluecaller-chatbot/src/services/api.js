// services/api.js

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_OPENAI_PROXY;

export async function callOpenAI(messages) {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, { messages });
    return response.data;
  } catch (error) {
    console.error("OpenAI Proxy Error:", error);
    return null;
  }
}
