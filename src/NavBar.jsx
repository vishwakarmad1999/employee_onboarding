import { Link } from "react-router";

export default function NavBar() {
    return (
      <nav
        className="navbar navbar-expand-lg mb-5 text-white"
        style={{ backgroundColor: "skyblue" }}
      >
        <div className="container-fluid">
          <div className="navbar-brand">Alisha-HR</div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Add Record
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/records" className="nav-link">
                Show Records
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
}