// import {
//   authFirebase,
//   signInWithEmailAndPassword,
// } from "../config/Firebase/firebaseConfig";
// import axios from "axios";

const RUTA_SERVIDOR = `${import.meta.env.VITE_APP_RUTA_API}`;

import { useUserStore } from "../stores/userStore";

async function registerWithFirebase(userData) {
  try {
    const { email, name, surname, birthdate, city, password, isAdmin } =
      userData;

    //Cambiar ruta de api
    const response = await fetch(`${RUTA_SERVIDOR}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        surname,
        birthdate,
        city,
        password,
        isAdmin,
      }),
    });

    //Si la respuesta no es satisfactoria
    console.log("response: ", response);
    if (!response.ok) {
      throw new Error("Error creating user.");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
}

async function saveUserDataInFirebase(userData) {
  try {
    const { email, name, surname, birthdate, city, isAdmin, uid } =
      userData;

    //Cambiar ruta de api
    const response = await fetch(`${RUTA_SERVIDOR}/users/saveUserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        surname,
        birthdate,
        city,
        isAdmin,
        uid
      }),
    });

    //Si la respuesta no es satisfactoria
    console.log("response: ", response);
    if (!response.ok) {
      throw new Error("Error saving user data in firebase.");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
}

async function sendEmail(to, subject, text) {
  try {
    console.log("TOOO: ", to);
    const response = await fetch(`${RUTA_SERVIDOR}/users/sendMail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, text }),
    });

    //Si la respuesta no es satisfactoria
    if (!response.ok) {
      throw new Error("Error sending mail.");
    }

    const res = await response.json();
    return res;
  } catch (error) {
    throw error;
  }
}

async function deleteUserById(id) {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/users/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting user.");
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw error;
  }
}

const getAllUsers = async () => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/users/`);

    if (!response.ok) {
      throw new Error("Error fetching users");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/users/user/${id}`);
    if (!response.ok) {
      throw new Error("Unable to find user.");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const { email, name, surname, birthdate, city } = userData;
    const response = await fetch(`${RUTA_SERVIDOR}/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: id, email, name, surname, birthdate, city }),
    });

    if (!response.ok) {
      throw new Error("Error updating user");
    }
    return response.ok;
  } catch (error) {
    throw error;
  }
};

export {
  registerWithFirebase,
  getAllUsers,
  getUser,
  updateUser,
  deleteUserById,
  sendEmail,
  saveUserDataInFirebase
};
