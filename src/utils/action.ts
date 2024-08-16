'use server'
import { revalidatePath } from "next/cache";
import { config } from "./config";
import Cookies from "js-cookie";
import { getCookie } from "./utils";
import { error } from "console";

export const loginUser = async (data:any) => {
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


export const getAllAgents = async () => {  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/agent/all`, {
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


export const updateAgent = async (data:any) =>{
  const token = await getCookie();

  try{
    const response = await fetch(`${config.server}/api/agent`, {
      method:'PUT',
      credentials:"include",
      headers: {
              "Content-Type": "application/json",
              Cookie: `userToken=${token}`,
            }, 
     body:JSON.stringify(data) 
    })
    const resdata = await response.json();
    console.log(resdata);
    return resdata;
    
  }catch(error){
    console.log(error);
    
  } finally {
    revalidatePath("/");
  }

}

export const deleteAgent = async (id:any)=> {
  const token = await getCookie();

  try {
    const response = await fetch( `${config.server}/api/agent/${id}`, {
      method:'DELETE',
      credentials:"include",
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


export const createAgent = async (data:any)=>{
  const token = await getCookie();
  try{
  const response = await fetch(`${config.server}/api/agent/`, {
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type": "application/json",
      Cookie: `userToken=${token}`,
    },
    body:JSON.stringify(data) 
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


export const updatePlayer = async (data:any) =>{
  const token = await getCookie();

  try{
    const response = await fetch(`${config.server}/api/player`, {
      method:'PUT',
      credentials:"include",
      headers: {
              "Content-Type": "application/json",
              Cookie: `userToken=${token}`,
            }, 
     body:JSON.stringify(data) 
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

export const deletePlayer = async (id:any)=> {
  const token = await getCookie();

  try {
    const response = await fetch( `${config.server}/api/player/${id}`, {
      method:'DELETE',
      credentials:"include",
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


export const createPlayer = async (data:any)=>{
  const token = await getCookie();

  try{
  const response = await fetch(`${config.server}/api/player/`, {
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type": "application/json",
      Cookie: `userToken=${token}`,
    },
    body:JSON.stringify(data) 
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

export const transactions = async (data:any)=>{
  const token = await getCookie();
try{
  const response = await fetch(`${config.server}/api/transaction/`, {
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type": "application/json",
      Cookie: `userToken=${token}`,
    },
    body:JSON.stringify(data) 
  })
  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }
  const responseData:any = await response.json();
  const respMessage = responseData.message
  
  return respMessage;
} catch (error) {
  console.log(error);
} finally {
  revalidatePath("/");
}
}


export async function getAllBets () {  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets/`, {
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
    const bets = data?.Bets;
    console.log(bets, "bets");
    
    return bets;
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}

export async function getAllBetsForAgent(agentId:any){
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets/${agentId}`, {
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
    const bets = data.Bets;

    console.log("");
    
    
    return bets;
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}

export const getBetsForPlayer = async (userId:any)=>{
   const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/bets/player/${userId}`,
      {
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
      const bets = data.Bets;
  
      console.log("");
      
      
      return bets;
    
  } catch (error) {
    
  }finally{
    revalidatePath("/")
  }
}

export const getTransactionsForPlayer = async (playerId:any)=>{
  const token = await getCookie();
 try {
   const response = await fetch(`${config.server}/api/bets/player/${playerId}`,
     {
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
     const transaction = data.transactions;
 
     console.log("");
     
     
     return transactions;
   
 } catch (error) {
   
 }finally{
   revalidatePath("/")
 }
}

export async function getAllTransactionsForAgent(agentId:any){
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/transaction/all/${agentId}`, {
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
    const transactions = data.transactions;

    console.log("");
    
    
    return transactions;
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}

export async function getAllPlayersForAgents(agentId:any){  
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/agent/players/${agentId}`, {
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
    const players = data.players;
    console.log(players);
    
    return players;
  } catch (error) {
    console.log("error:", error);  
  }finally{
    revalidatePath("/");
  }
}