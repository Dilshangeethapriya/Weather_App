import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function TitleBar() {
  return (
    <Link className="link-style" to="/">
      <div className="titleBar">
        <img className="title-img" src={Logo} alt="logo" />
        <p className="title-name">Weather App</p>
      </div>
    </Link>
  );
}

export default TitleBar;
