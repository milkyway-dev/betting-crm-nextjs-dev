'use server'
import { revalidatePath } from "next/cache";
import { config } from "./config";

export const loginUser = async (data:any) => {
    try {
      const response = await fetch(`${config.server}/api/users/login`, {
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
      return { responseData };
    } catch (error) {
      console.log("error:", error);
    } finally {
      revalidatePath("/");
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
  }
};
