import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import NavItem from "../components/NavItem";
import PasswordEye from "../components/PasswordEye";
import { AnimatePresence } from "framer-motion";
import ErrorModal from "../components/ErrorModal";

export default function UserAccount() {
  const { user, token } = useAuthContext();

  // for email and username updation
  const [userName, setUserName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  // for email and username updation acknowledgment modal and its error
  const [showModal, setShowModal] = useState("");
  const [error, setError] = useState(null);

  // for eye icon on password inputs
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isNewPasswordConfirmVisible, setIsNewPasswordConfirmVisible] =
    useState(false);

  // for password input fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleUsernameEmailUpdation = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_REMOTE_URL}api/v1/users/updateMe`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userName,
          email,
        }),
      });

      const data = await res.json();

      if (data.status === "success") setShowModal("success");
      if (data.status === "error") throw new Error(data.message);
    } catch (err) {
      setError(err.message);
      setShowModal("error");
      console.log(err);
    }

    setTimeout(() => setShowModal(""), 3000);
  };

  const handlePasswordUpdation = async (e) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REMOTE_URL}api/v1/users/updateMyPassword`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            passwordCurrent: currentPassword,
            password: newPassword,
            passwordConfirm: confirmNewPassword,
          }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("jwt", data.token);
        setShowModal("success");
      }
      if (data.status === "fail" || data.status === "error")
        throw new Error(data.message);
    } catch (err) {
      setError(err.message);
      setShowModal("error");
      console.log(err);
    }

    setIsPending(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    setTimeout(() => setShowModal(""), 3000);
  };

  return (
    <>
      <AnimatePresence>
        {showModal === "success" && (
          <ErrorModal msg='The data is successfully updated!' type='success' />
        )}
        {showModal === "error" && <ErrorModal msg={error} type='error' />}
      </AnimatePresence>
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
              <form
                className='form form-user-data'
                onSubmit={handleUsernameEmailUpdation}
              >
                <div className='form__group'>
                  <label className='form__label' htmlFor='name'>
                    Name
                  </label>
                  <input
                    className='form__input'
                    id='name'
                    type='text'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required='required'
                  />
                </div>
                <div className='form__group form__photo-upload'>
                  <img
                    className='form__user-photo'
                    src={`${import.meta.env.VITE_REMOTE_URL}img/users/${user.photo}`}
                    alt='User photo'
                  />
                  <a className='btn-text' href=''>
                    Choose new photo
                  </a>
                </div>
                <div className='form__group right'>
                  <button
                    className='btn btn--small btn--green'
                    disabled={isPending}
                  >
                    Save settings
                  </button>
                </div>
              </form>
            </div>
            <div className='line'>&nbsp;</div>
            <div className='user-view__form-container'>
              <h2 className='heading-secondary ma-bt-md'>Password change</h2>
              <form
                className='form form-user-settings'
                onSubmit={handlePasswordUpdation}
              >
                <div className='form__group'>
                  <label className='form__label' htmlFor='password-current'>
                    Current password
                  </label>
                  <input
                    className='form__input'
                    id='password-current'
                    type={isCurrentPasswordVisible ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                  <button
                    className='btn btn--small btn--green'
                    disabled={isPending}
                  >
                    Save password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
