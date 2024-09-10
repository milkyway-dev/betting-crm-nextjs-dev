'use server'
import { revalidatePath } from "next/cache";
import { config } from "./config";
import Cookies from "js-cookie";
import { getCookie, getCurrentUser } from "./utils";

export const loginUser = async (data: any) => {
  try {
    const response = await fetch(`${config.server}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    const token = responseData?.token;
    if (token) {
      Cookies.set("token", token);
    }
    return responseData;
  } catch (error) {
    console.log("error:", error);
  }
};
export const GetCaptcha = async () => {
  try {
    const response = await fetch(`${config.server}/api/auth/captcha`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return { responseData };
  } catch (error) {
    console.log("error:", error);
  } finally {
    revalidatePath("/");
  }
};
export const updateSubordinates = async (data: any, Id: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/subordinates/${Id}`, {
      method: 'PUT',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
      body: JSON.stringify(data)
    })
    const resdata = await response.json();
    return resdata;

  } catch (error) {
    console.log(error);

  } finally {
    revalidatePath("/");
  }

}
export const deleteSubordinates = async (id: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/subordinates/${id}`, {
      method: 'DELETE',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    })
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return { responseData };
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/");
  }
}
export const createSubordinates = async (data: any) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/subordinates`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return { responseData };


  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/");
  }
}
export const updatePlayer = async (data: any, Id: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/players/${Id}`, {
      method: 'PUT',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return { responseData };


  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/");
  }

}
export const deletePlayer = async (id: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/players/${id}`, {
      method: 'DELETE',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    })
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return { responseData };


  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/");
  }
}
export const createPlayer = async (data: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/players`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return { responseData };


  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/");
  }

}
export const transactions = async (data: any) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/transactions/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData: any = await response.json();
    const respMessage = responseData.message

    return respMessage;
  } catch (error) {
  }finally {
    revalidatePath('/')
  }
}
export const getBetsForPlayer = async (userId: any) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets/player/${userId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        }
      })

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    const bets = data.Bets;

    return bets;

  } catch (error) {

  }
}
export const getCredits = async () => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/auth`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        }
      })

    if (!response.ok) {
      const error = await response.json();

      return { error: error.message };
    }

    const data = await response.json();
    const credits = data;

    return credits;

  } catch (error) {

  }
}
export const getSubordinatesReport = async (username: string) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/subordinates/${username}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        }
      })

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    const report = data;
    return report;
  } catch (error) {

  } finally {
    revalidatePath('/')
  }
}
export async function getAllBets(user:any) {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}${user?.role==="admin"?'/api/bets/':`/api/bets/${user?.userId}`}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      }
    })

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    const bets = data;
    return bets;
  } catch (error) {
  }
}
export async function getAllTransactions(user: any, searchString: string) {
  let transaction: string = `/api/transactions`;
  if (searchString?.length>0) {
    transaction += `?search=${encodeURIComponent(String(searchString))}`;
  }
  let transaction_subordinates: string = `/api/transactions/${user?.username}/subordinate?type=username`;
  if (searchString?.length>0) {
    transaction_subordinates += `&search=${encodeURIComponent(String(searchString))}`;
  }
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}${user?.role=='admin'?transaction:transaction_subordinates}`, {
      method:"GET",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
        Cookie: `userToken=${token}`,
      }
    })
     
    if(!response.ok){
      const error = await response.json();
      return {error:error.message};
    }

    const data = await response.json();
    const transactions = data;
    return transactions;
  } catch (error) {
  }
}

export async function getSubordinates(role: string,searchString:string) {
  const token = await getCookie();
  const user: any = await getCurrentUser();
  let url: string = `/api/subordinates?type=${role}`;
  if (searchString?.length>0) {
    url += `&search=${encodeURIComponent(String(searchString))}`;
  }

  let subordinatesurl: string = `/api/subordinates/${user?.username}/subordinates?type=username`;
  if (searchString?.length>0) {
    subordinatesurl += `&search=${encodeURIComponent(String(searchString))}`;
  }
  
  try {
    const response = await fetch(`${config.server}${user?.role === 'admin' ? url : subordinatesurl}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      }
    })


    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    const all = data;
    return all;
  } catch (error) {
  } finally {
    revalidatePath("/");
  }

  
}

export async function getUserNotifications() {
  console.log("gettting called");
  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/notifications/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      }
    })
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const data = await response.json();
    console.log(data);
  
    return data;

  } catch (error) {
  } finally {
    revalidatePath("/");
  }
}

  export const resolveStatus = async (data: any, Id: any) => {
    const token = await getCookie();

    try {
      const response = await fetch(`${config.server}/api/bets/resolve/${Id}`, {
        method: 'PUT',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        const error = await response.json();
        return { error: error.message };
      }
      const responseData = await response.json();
      return { responseData };
    } catch (error) {
      console.log(error);
    } finally {
      revalidatePath("/");
    }
  }
