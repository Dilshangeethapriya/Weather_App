import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { APP_TITLE, HOME_ROUTE } from "../data/constants";

function TitleBar() {
  return (
    <Link className="link-style" to={HOME_ROUTE}>
      <div className="titleBar">
        <img className="title-img" src={Logo} alt="logo" />
        <p className="title-name">{APP_TITLE}</p>
      </div>
    </Link>
  );
}

export default TitleBar;
