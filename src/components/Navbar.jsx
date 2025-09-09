import "../styles/Navbar.css"

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">My Portfolio</h1>
      <ul className="navbar-links">
        <li><a href="#home" className="navbar-link">Home</a></li>
        <li><a href="#about" className="navbar-link">About</a></li>
        <li><a href="#projects" className="navbar-link">Projects</a></li>
        <li><a href="#contact" className="navbar-link">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
