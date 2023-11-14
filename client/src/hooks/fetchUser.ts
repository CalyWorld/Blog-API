import { User } from "../context/userContext";

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
      setUser(user);
    } else {
      console.log("Failed to fetch user");
    }
  } catch (err) {
    console.log(err);
  }
};

export default fetchUserData;
