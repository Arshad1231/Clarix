const BackendPath = "http://localhost:5000/api/connection";

/* ============================
   REGISTER
============================ */
export const userRegisterCURD = async (formData) => {
  try {
    const response = await fetch(`${BackendPath}/user/register`, {
      method: "POST",
      body: formData, // FormData (multipart)
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;

  } catch (error) {
    console.error("Error occurred while registering user:", error);
    throw error;
  }
};

/* ============================
   LOGIN
============================ */
export const userLoginCURD = async (formData) => {
  try {
    const response = await fetch(`${BackendPath}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;

  } catch (error) {
    console.error("Error occurred in userLoginCURD:", error);
    throw error;
  }
};

/* ============================
   AUTH CHECK (/me)
============================ */
export const userAuthCURD = async () => {
  try {
    const response = await fetch(`${BackendPath}/user/me`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Not authenticated");
    }

    return data;

  } catch (error) {
    console.error("Error occurred in userAuthCURD:", error);
    throw error;
  }
};

/* ============================
   LOGOUT
============================ */
export const userLogOutCURD = async () => {
  try {
    const response = await fetch(`${BackendPath}/user/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }

    return data;

  } catch (error) {
    console.error("Error occurred in userLogOutCURD:", error);
    throw error;
  }
};

/* ============================
   USER DETAILS
============================ */
export const userDetailsCURD = async (id) => {
  try {
    const response = await fetch(`${BackendPath}/user/getone/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch user details");
    }

    return data;

  } catch (error) {
    console.error("Error occurred in userDetailsCURD:", error);
    throw error;
  }
};

export const GetAllUsersCURD = async()=>{
  try {
    const response = await fetch(`${BackendPath}/user/getall`,{
      method:"GET",
      credentials:"include"
    })

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch user details");
    }

    return data;
  } catch (error) {
    console.error("Error occurred in GetAllUsersCURD:", error);
    throw error;
  }
}

export const SendRequestCURD = async(details)=>{
  try {
    const response = await fetch(`${BackendPath}/user/sendreq`,{
      method:"POST",
      body:JSON.stringify(details),
      credentials:"include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error occurred in SendRequestCURD:", error);
    throw error;
  }
}

export const AcceptRequestCURD = async(details)=>{
  try {
    const response = await fetch(`${BackendPath}/user/accreq`,{
      method:"POST",
      body:JSON.stringify(details),
      credentials:"include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to accept user details");
    }

    return data;
  } catch (error) {
    console.error("Error occurred in AcceptRequestCURD:", error);
    throw error;
  }
}
export const RejectRequestCURD = async(details)=>{
  try {
    const response = await fetch(`${BackendPath}/user/rejreq`,{
      method:"POST",
      body:JSON.stringify(details),
      credentials:"include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to reject user details");
    }

    return data;
  } catch (error) {
    console.error("Error occurred in AcceptRequestCURD:", error);
    throw error;
  }
}
export const GetFriendsCURD=async ()=>{
  try {
    const response = await fetch(`${BackendPath}/user/getfrnds`,{
      method:"GET",
      credentials:"include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get friends");
    }

    return data;
  } catch (error) {
    console.error("Error occurred in GetFriendsCURD:", error);
    throw error;
  }
}


export const GetRequestDetailsCURD = async() =>{
  try {
    const response = await fetch(`${BackendPath}/user/getrequser`,{
      method:"GET",
      credentials:"include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get requrest details");
    }

    return data;
  } catch (error) {
    console.error("Error occurred in GetRequestDetailsCURD:", error);
    throw error;
  }
}
