import { useContext ,useEffect} from "react";
import Login from "./Login";
import Games from "./MainPage/Games";
import { UserContext } from "./../../AppContext";

function LoginPage() {
  const { token, myProfile } = useContext(UserContext);
  useEffect(() => {
    myProfile();
  }, []);
  return <div className="">{!token ? <Login /> : <Games />}</div>;
}

export default LoginPage;
