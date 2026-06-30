//https://myapp2025.cfapps.us10-001.hana.ondemand.com/dumpquestion
import {getDataProvider } from "../Data/ContextHandler/constant";
const baseURL = getDataProvider();//"MyDataprovider";

const getDumpQuestions = async (questionID, params = {}) => {
  let url = baseURL + "/dumpquestion";
  if(questionID){
    url = url + "/"+ questionID;
  } else {
    // Add query parameters for pagination and filtering
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.category) queryParams.append('category', params.category);
    if (params.questionType) queryParams.append('questionType', params.questionType);
    if (params.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    if (queryString) {
      url = url + "?" + queryString;
    }
  }
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}

const addDumpQuestion = async (payload) => {
  const url = baseURL + "/dumpquestion/addquestions";
  payload.questionId = new Date().getTime().toString();
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}
const removeDumpQuestion = async (id) => {
  const url = baseURL + "/dumpquestion/removeItem/"+id ;
  try {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}
const updateDumpQuestion = async (payload) => {
  const url = baseURL + "/dumpquestion/updateItem/"+ payload._id;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}



const getCategories = async () => {
  const url = baseURL + "/dumpquestion/category";
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return { categories: [], count: 0 };
  }
}

const getTakeQuiz = async (user, category) => {
  const url = baseURL + "/dumpquestion/takequiz";
  const queryParams = new URLSearchParams();
  if (user) queryParams.append('user', user);
  if (category) queryParams.append('category', category);
  
  const queryString = queryParams.toString();
  const finalUrl = queryString ? `${url}?${queryString}` : url;
  
  try {
    const response = await fetch(finalUrl, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}

export { getDumpQuestions, addDumpQuestion ,removeDumpQuestion,updateDumpQuestion, getTakeQuiz, getCategories};