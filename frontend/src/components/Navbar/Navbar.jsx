import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Roteirus</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">New Blog</Link>
      </div>
    </nav>
  );
}

export default Navbar;