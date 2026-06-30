//https://myapp2025.cfapps.us10-001.hana.ondemand.com/dumpquestion
import {getDataProvider } from "../Data/ContextHandler/constant";
import { LocalStorage } from "../Data/LocalStorage";

const baseURL = getDataProvider();//"MyDataprovider";
const _myLocalStorageUtility = LocalStorage();

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
  const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
  const _token = loggedInUser?.token || "";
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_token}`
      }
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

const addDumpQuestion = async (payload) => {
  const url = baseURL + "/dumpquestion/addquestions";
  payload.questionId = new Date().getTime().toString();
  const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
  const _token = loggedInUser?.token || "";
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${_token}`
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
  const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
  const _token = loggedInUser?.token || "";
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_token}`
      }
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
const updateDumpQuestion = async (payload) => {
  const url = baseURL + "/dumpquestion/updateItem/"+ payload._id;
  const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
  const _token = loggedInUser?.token || "";
  try {
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${_token}`
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
  const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
  const _token = loggedInUser?.token || "";
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_token}`
      }
    });
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
  
  const loggedInUser = _myLocalStorageUtility.getLoggedInUserData();
  const _token = loggedInUser?.token || "";
  
  try {
    const response = await fetch(finalUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_token}`
      }
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

export { getDumpQuestions, addDumpQuestion ,removeDumpQuestion,updateDumpQuestion, getTakeQuiz, getCategories};