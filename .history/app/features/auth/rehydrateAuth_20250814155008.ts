
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import { setAuth } from "../authSlice";

export const rehydrateAuth = async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem("access");
    if (!token) return;

    const { data: fetchedUser } = await axios.get("/auth/users/me/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Now fetchedUser already has isAdmin from backend
    dispatch(setAuth({ token, user: fetchedUser }));

  } catch (error) {
    console.error("Error rehydrating auth:", error);
  }
};
