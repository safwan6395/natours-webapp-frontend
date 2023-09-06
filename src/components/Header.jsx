import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function Header() {
  const { user } = useAuthContext();

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
        {user ? (
          <>
            <button className='nav__el'>
              My bookings
            </button>
            <button className='nav__el'>
              <img
                src={`/assets/img/users/${user.photo}`}
                alt='User photo'
                className='nav__user-img'
              />
              <span>{user.name.split(' ')[0]}</span>
            </button>
          </>
        ) : (
          <>
            <Link className='nav__el' to='/login'>
              Log in
            </Link>
            <Link className='nav__el nav__el--cta' to='/signup'>
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;
