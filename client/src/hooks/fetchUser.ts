import { User } from "../context/userContext";
import Cookies from "js-cookie";
const fetchUserData = async (
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  userUrl: string,
) => {
  try {
    const response = await fetch(userUrl, {
      method: "GET", // Specify the GET method
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const user = await response.json();
      Cookies.set(
        "userInfo",
        JSON.stringify({
          username: user.username,
          password: user.password,
        }),
        { expires: 29 },
      );
      setUser(user);
    } else {
      console.log("Failed to fetch user");
    }
  } catch (err) {
    console.log(err);
  }
};

export default fetchUserData;
