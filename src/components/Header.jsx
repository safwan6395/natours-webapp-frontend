import { Link } from "react-router-dom";

function Header() {
  return (
    <header className='header'>
      <nav className='nav nav--tours'>
        <Link to='/' className='nav__el'>
          All tours
        </Link>
        <form className='nav__search'>
          <button className='nav__search-btn'>
            <svg>
              <use href='/assets/img/icons.svg#icon-search'></use>
            </svg>
          </button>
          <input
            type='text'
            placeholder='Search tours'
            className='nav__search-input'
          />
        </form>
      </nav>
      <div className='header__logo'>
        <img src='/assets/img/logo-white.png' alt='Natours logo' />
      </div>
      <nav className='nav nav--user'>
        {/* <a href='#' className='nav__el'>
          My bookings
        </a>
        <a href='#' className='nav__el'>
          <img src='/assets/img/user.jpg' alt='User photo' className='nav__user-img' />
          <span>Jonas</span>
        </a>*/}

        <button className='nav__el'>Log in</button>
        <button className='nav__el nav__el--cta'>Sign up</button>
      </nav>
    </header>
  );
}
export default Header;
