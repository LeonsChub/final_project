import { useContext } from "react";
import { TokenContext } from "../../AppContext";
import Login from "./Login";

function LoginPage() {
  const [token] = useContext(TokenContext);
  return (
    <div className="">
      {token === "EMPTY" ? <Login /> : <h1>ALREADY LOGGED IN</h1>}
    </div>
  );
}

export default LoginPage;
