import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import NavItem from "../components/NavItem";
import PasswordEye from "../components/PasswordEye";

export default function UserAccount() {
  const { user } = useAuthContext();

  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isNewPasswordConfirmVisible, setIsNewPasswordConfirmVisible] =
    useState(false);

  return (
    <main className='main'>
      <div className='user-view'>
        <nav className='user-view__menu'>
          <ul className='side-nav'>
            <NavItem link='#' text='Settings' icon='icon-settings' active />
            <NavItem link='#' text='My bookings' icon='icon-briefcase' />
            <NavItem link='#' text='My reviews' icon='icon-star' />
            <NavItem link='#' text='Billing' icon='icon-credit-card' />
          </ul>
          {user.role === "admin" && (
            <div className='admin-nav'>
              <h5 className='admin-nav__heading'>Admin</h5>
              <ul className='side-nav'>
                <NavItem link='#' text='Manage tours' icon='icon-map' />
                <NavItem link='#' text='Manage users' icon='icon-users' />
                <NavItem link='#' text='Manage reviews' icon='icon-star' />
                <NavItem
                  link='#'
                  text='Manage bookings'
                  icon='icon-briefcase'
                />
              </ul>
            </div>
          )}
        </nav>
        <div className='user-view__content'>
          <div className='user-view__form-container'>
            <h2 className='heading-secondary ma-bt-md'>
              Your account settings
            </h2>
            <form className='form form-user-data'>
              <div className='form__group'>
                <label className='form__label' htmlFor='name'>
                  Name
                </label>
                <input
                  className='form__input'
                  id='name'
                  type='text'
                  defaultValue={user.name}
                  required='required'
                />
              </div>
              <div className='form__group ma-bt-md'>
                <label className='form__label' htmlFor='email'>
                  Email address
                </label>
                <input
                  className='form__input'
                  id='email'
                  type='email'
                  defaultValue={user.email}
                  required='required'
                />
              </div>
              <div className='form__group form__photo-upload'>
                <img
                  className='form__user-photo'
                  src={`http://localhost:3000/img/users/${user.photo}`}
                  alt='User photo'
                />
                <a className='btn-text' href=''>
                  Choose new photo
                </a>
              </div>
              <div className='form__group right'>
                <button className='btn btn--small btn--green'>
                  Save settings
                </button>
              </div>
            </form>
          </div>
          <div className='line'>&nbsp;</div>
          <div className='user-view__form-container'>
            <h2 className='heading-secondary ma-bt-md'>Password change</h2>
            <form className='form form-user-settings'>
              <div className='form__group'>
                <label className='form__label' htmlFor='password-current'>
                  Current password
                </label>
                <input
                  className='form__input'
                  id='password-current'
                  type={isCurrentPasswordVisible ? "text" : "password"}
                  placeholder='••••••••'
                  required='required'
                  minLength='8'
                />
                <PasswordEye
                  handleClick={() => setIsCurrentPasswordVisible((ps) => !ps)}
                  passwordVisibility={isCurrentPasswordVisible}
                />
              </div>
              <div className='form__group'>
                <label className='form__label' htmlFor='password'>
                  New password
                </label>
                <input
                  className='form__input'
                  id='password'
                  type={isNewPasswordVisible ? "text" : "password"}
                  placeholder='••••••••'
                  required='required'
                  minLength='8'
                />
                <PasswordEye
                  handleClick={() => setIsNewPasswordVisible((ps) => !ps)}
                  passwordVisibility={isNewPasswordVisible}
                />
              </div>
              <div className='form__group ma-bt-lg'>
                <label className='form__label' htmlFor='password-confirm'>
                  Confirm password
                </label>
                <input
                  className='form__input'
                  id='password-confirm'
                  type={isNewPasswordConfirmVisible ? "text" : "password"}
                  placeholder='••••••••'
                  required='required'
                  minLength='8'
                />
                <PasswordEye
                  handleClick={() =>
                    setIsNewPasswordConfirmVisible((ps) => !ps)
                  }
                  passwordVisibility={isNewPasswordConfirmVisible}
                />
              </div>
              <div className='form__group right'>
                <button className='btn btn--small btn--green'>
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}