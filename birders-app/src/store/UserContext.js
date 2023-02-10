import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserStore(props) {
  const [nickname, setNickname] = useState("sandy");
  const user = {
    name: "sandpiper",
    email: "ddd",
    //changeNickname: (updated) => setNickname(updated),
    test: () => {},
  };

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}
