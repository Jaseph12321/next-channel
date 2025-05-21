"use client";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../../../controller/userController";
import { userData } from "../../../model/model";
import "../../profile/profile.scss";
import { useRouter } from "next/navigation";
import { useUser } from "../../../UserContext";

interface Props {
  id: string;
}

const ProfileClient: React.FC<Props> = ({ id }) => {
  const { logout } = useUser();
  const [user, setUser] = useState<userData>();
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    getUser({ id, name: "undefined" }).then((userData) => {
      setUser(userData);

      console.log("user datatatata", userData);
      if (userData) {
        setName(userData.name || "");
        setAge(userData.age || 0);
        setEmail(userData.email || "");
      }
    });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUserData: userData = {
      id: id,
      name,
      age,
      email,
    };

    try {
      updateUser(newUserData);
      handleLogOut();
    } catch (e) {
      console.log(e);
      throw new Error(String(e));
    }
  };

  return (
    <div className="login-container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">id:</label>
        <input required id="userId" type="text" value={user?.id} readOnly />

        <label htmlFor="username">Name:</label>
        <input
          required
          id="username"
          type="text"
          placeholder={user?.name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="userAge">Age:</label>
        <input
          required
          id="userAge"
          type="number"
          min={0}
          max={100}
          placeholder={user?.age.toString()}
          onChange={(e) => setAge(Number(e.target.value))}
        />

        <label htmlFor="userEmail">UserEmail:</label>
        <input
          required
          id="userEmail"
          pattern="^[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,}$"
          type="text"
          placeholder={user?.email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileClient;
