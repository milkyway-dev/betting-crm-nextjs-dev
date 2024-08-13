'use server'
import { revalidatePath } from "next/cache";
import { config } from "./config";
import Cookies from "js-cookie";
import { getCookie } from "./utils";

export const loginUser = async (data:any) => {
    try {
      const response = await fetch(`${config.server}/auth/login`, {
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
      console.log(responseData);
      
      const token = responseData?.token;
      console.log(token);
      
      if(token){  
       Cookies.set("token", token);      
      } 
        return responseData  ;
    } catch (error) {
      console.log("error:", error);
    } finally {
      // revalidatePath("/");
    }
};
  
export const GetCaptcha = async () => {
  try {
    const response = await fetch(`${config.server}/auth/captcha`, {
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


export const getAllAgents = async () => {  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/agent/all`, {
      method:"GET",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
        Cookie: `userToken=${token}`,
      }
    })
     
    if(!response.ok){
      const error = await response.json();
      console.log(error);
      
      return {error:error.message};
    }

    const data = await response.json();
    const agents = data.agents;
    console.log(agents);
    
    return {agents};
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}