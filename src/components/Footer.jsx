import { Link } from "react-router-dom";
import mailIcon from "/icons/ant-design--mail-outlined.png";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <p>&copy; 2026 Vinyl Webshop</p>
      </div>

      <div>
        <p><img src={mailIcon} alt="Contact" className="icon" />info@vinylwebshop.com</p>
      </div>

      <div>
        <Link to="/About">About us</Link>
      </div>
    </footer>
  );
}

export default Footer;