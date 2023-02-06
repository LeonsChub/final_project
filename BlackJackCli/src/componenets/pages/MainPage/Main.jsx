import Header from "./Header";
import Games from "./Games";
import Profile from "./Profile";
import About from "./About";
const Main = () => {
  return (
    <div className="mainSpace">
      <Header />
      <Games />
      <Profile />
      <About />
    </div>
  );
};

export default Main;
