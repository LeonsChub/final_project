import { useContext } from "react";
import { TokenContext } from "../../AppContext";
import LoginForm from "../forms/LoginForm";
function LoginPage() {
  const [token] = useContext(TokenContext);
  return (
    <div className="bg-dark w-50 mx-auto bg mt-4 p-3 rounded text-light">
      {token === "EMPTY" ? <LoginForm /> : <h1>ALREADY LOGGED IN</h1>}
    </div>
  );
}

export default LoginPage;
