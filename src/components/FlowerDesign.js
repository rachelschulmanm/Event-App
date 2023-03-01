import React from "react";

import axios from "axios";
import React, { useEffect } from "react";

export const getAllShoes = async () => {
  try {
    const res = await axios.get(
      "https://63fc6c4e8ef914c555971d53.mockapi.io/api/shoes/"
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShoeById = async (id) => {
  try {
    const res = await axios.get(
      `https://63fc6c4e8ef914c555971d53.mockapi.io/api/shoes/` + id
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const addShoe = async (body) => {
  try {
    const res = await axios.post(
      `https://63fc6c4e8ef914c555971d53.mockapi.io/api/shoes/`,
      body
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateShoeById = async (id, body) => {
  try {
    const res = await axios.put(
      `https://63fc6c4e8ef914c555971d53.mockapi.io/api/shoes/${id}`,
      body
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteShoeById = async (id) => {
  try {
    const res = await axios.delete(
      `https://63fc6c4e8ef914c555971d53.mockapi.io/shoes/${id}`
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
