import axios from "axios";
//users
export const addUser = async (user) => {
  try {
    const res = await axios.post(
      "https://640077049f84491029917166.mockapi.io/api/users",
      user
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(
      "https://640077049f84491029917166.mockapi.io/api/users"
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getUserById = async (id) => {
  try {
    const res = await axios.get(
      `https://640077049f84491029917166.mockapi.io/api/users/${id}`
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
//events
export const addEvent = async (event) => {
  try {
    const res = await axios.post(
      "https://640077049f84491029917166.mockapi.io/api/events",
      event
    );
    return res.data
  } catch (error) {
    console.log(error);
  }
};
export const deleteEventApi = async (eventId) => {
  try {
    const res = await axios.delete(
      `https://640077049f84491029917166.mockapi.io/api/events/${eventId}`
    );
    return res.data
  } catch (error) {
    console.log(error);
  }
};
export const updateEvent = async (eventId, event) => {
  try {
    const res = await axios.put(
      `https://640077049f84491029917166.mockapi.io/api/events/${eventId}`,
      event
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllEvents = async () => {
  try {
    const res = await axios.get(
      "https://640077049f84491029917166.mockapi.io/api/events"
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//flowers
export const getAllFlowers = async () => {
  try {
    const res = await axios.get(
      "https://6408aa898ee73db92e47ec34.mockapi.io/flowers"
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
