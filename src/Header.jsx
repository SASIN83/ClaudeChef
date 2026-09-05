import './Header.css'
import heroImg from './assets/hero.png'


function Header(){
    return (
        <nav className="nav-item">
            <img className="hero-img" src={heroImg} alt="HeroImage" />
            <span className="hero-title">Claude Chef</span>
        </nav>
    )
}

export default Header