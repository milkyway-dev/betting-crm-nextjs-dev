"use server";
import { revalidatePath } from "next/cache";
import { config } from "./config";
import Cookies from "js-cookie";
import { getCookie, getCurrentUser } from "./utils";
import { BannerData } from "./Types";

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
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
      body: JSON.stringify(data),
    });
    const resdata = await response.json();
    return resdata;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/");
  }
};
export const deleteSubordinates = async (id: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/subordinates/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });
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
};
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
      body: JSON.stringify(data),
    });
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
};
export const updatePlayer = async (data: any, Id: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/players/${Id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
      body: JSON.stringify(data),
    });
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
};
export const deletePlayer = async (id: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/players/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });
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
};
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
      body: JSON.stringify(data),
    });
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
};
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
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData: any = await response.json();
    const respMessage = responseData.message;

    return respMessage;
  } catch (error) {
  } finally {
    revalidatePath("/");
  }
};
export const getBetsForPlayer = async (userId: any) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets/player/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    const bets = data.Bets;

    return bets;
  } catch (error) {}
};
export const getCredits = async () => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/auth`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();

      return { error: error.message };
    }

    const data = await response.json();
    const credits = data;

    return credits;
  } catch (error) {}
};
export const getSubordinatesReport = async (username: string) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/subordinates/${username}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    const report = data;
    return report;
  } catch (error) {
  } finally {
    revalidatePath("/");
  }
};
export async function getAllBets(user: any) {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}${
        user?.role === "admin" ? "/api/bets/" : `/api/bets/${user?.userId}`
      }`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    const bets = data;
    return bets;
  } catch (error) {}
}
export async function getAllTransactions(user: any, searchString: string) {
  let transaction: string = `/api/transactions`;
  if (searchString?.length > 0) {
    transaction += `?search=${encodeURIComponent(String(searchString))}`;
  }
  let transaction_subordinates: string = `/api/transactions/${user?.username}/subordinate?type=username`;
  if (searchString?.length > 0) {
    transaction_subordinates += `&search=${encodeURIComponent(
      String(searchString)
    )}`;
  }
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}${
        user?.role == "admin" ? transaction : transaction_subordinates
      }`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    const data = await response.json();
    const transactions = data;
    return transactions;
  } catch (error) {}
}

export async function getSubordinates(role: string, searchString: string) {
  const token = await getCookie();
  const user: any = await getCurrentUser();
  let url: string = `/api/subordinates?type=${role}`;
  if (searchString?.length > 0) {
    url += `&search=${encodeURIComponent(String(searchString))}`;
  }

  let subordinatesurl: string = `/api/subordinates/${user?.username}/subordinates?type=username`;
  if (searchString?.length > 0) {
    subordinatesurl += `&search=${encodeURIComponent(String(searchString))}`;
  }

  try {
    const response = await fetch(
      `${config.server}${user?.role === "admin" ? url : subordinatesurl}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );

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
    const response = await fetch(
      `${config.server}/api/notification?viewedStuatus=${true}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const data = await response.json();
    console.log(data);
    //sort data according to createdAt

    data.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return data;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/");
  }
}

export const setViewedNotification = async (notificationId: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(
      `${config.server}/api/notification?notificationId=${notificationId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );
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
};

export const resolveStatus = async (data: any, Id: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/bets/resolve/${Id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
      body: JSON.stringify(data),
    });
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
};

export const fetchSportsCategory = async () => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/banner/category`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const uploadBanner = async (data: any) => {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/banner`, {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `userToken=${token}`,
      },
      body: data,
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getBanners = async (category: string, status: string) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/banner?category=${category}&status=${status}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const updateBannerStatus = async (banners: string[], status: string) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/banner`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
      body: JSON.stringify({ banners, status }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBanners = async (banners: string[]) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/banner`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
      body: JSON.stringify({ banners }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

  export async function getDailyActivity(username:string) {
    
    const token = await getCookie();
    try {
      const response = await fetch(`${config.server}/api/userActivities/${username}`, {
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
    
      return data;
  
    } catch (error) {
    }
  }

export async function getActivitiesByDateAndPlayer(date: string, playerId: string) {
  console.log(playerId,"player id");
  
  const token = await getCookie();
  try {
      const response = await fetch(`${config.server}/api/userActivities?date=${encodeURIComponent(date)}&playerId=${encodeURIComponent(playerId)}`, {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
              Cookie: `userToken=${token}`,
          },
      });

      if (!response.ok) {
          const error = await response.json();
          return { error: error.message };
      }

      const data = await response.json();
      return data;

  } catch (error) {
      return { error: 'An error occurred while fetching activities.' };
  }
}

export async function getBetsAndTransactions(startTime: string, endTime: string, playerId: string) {
  const token = await getCookie();
  console.log(startTime, endTime, playerId);
  

  try {
      const response = await fetch(`${config.server}/api/userActivities`, {
          method: "POST",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
              "Cookie": `userToken=${token}`,
          },
          body: JSON.stringify({ startTime, endTime, playerId }),
      });

      if (!response.ok) {
          const error = await response.json();
          console.log(error);
          
          return { error: error.message };
      }

      const data = await response.json();
      console.log(data);
      
      return data;

  } catch (error) {
      return { error: 'An error occurred while fetching bets and transactions.' };
  }
}


export async function updateBet(payload:any){
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets`, {
      method: "PUT",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
          "Cookie": `userToken=${token}`,
      },
      body: JSON.stringify(payload),
    });

  if (!response.ok) {
      const error = await response.json();
      console.log(error);
      
      return { error: error.message };
  }

  const data = await response.json();
  console.log(data);
  
  return data;

} catch (error) {
  return { error: 'An error occurred while fetching bets and transactions.' };
}finally {
  revalidatePath("/");
}
}