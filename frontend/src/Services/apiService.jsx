import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/";

export const api_image_base_url = "http://localhost:8000/storage/"

const apiClient = axios.create({
  baseURL: API_BASE_URL, // Replace with your API URL
});

// Add a request interceptor to inject the JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//Busca os dados do endpoint determinado
export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Busca item expecifico pelo ID
export const fetchItemData = async (endpoint, id) => {
  try {
    const response = await apiClient.get(`${endpoint}/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Cria novas coisas para o Banco (data em formato json)
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint,data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Atualiza uma entidade (informar id e passar data em formato json)
export const editData = async (endpoint, data, id) => {
  try {
    const response = await apiClient.patch(
      `${endpoint}/${id}`,
     data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Apaga um item pelo id
export const deleteItem = async (endpoint, id) => {
  try {
    const response = await apiClient.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUsuario = async (data) => {
  try {
    const response = await apiClient.post("auth/login", data);
    let resposta = response.data;
    let token = resposta.access_token;
    localStorage.setItem("token", token);
    return(true);
  } catch (error) {
    console.log(error);
    throw error;
    
  }
};

export const loginCiaAerea = async (data) => {
  try {
    const response = await apiClient.post(
      "cia_aerea/login",
      data
    );
    let resposta = response.data;
    let token = resposta.access_token;
    localStorage.setItem("token", token);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
