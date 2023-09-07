import { useState, useRef } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const avatarInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(displayName, email, password, passwordConfirm, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    const selected = e.target.files[0];

    if (!selected) {
      return setThumbnailError("Please select a file");
    }

    if (!selected.type.includes("image")) {
      return setThumbnailError("Selected file must be an image");
    }

    if (selected.size > 100000) {
      return setThumbnailError("Image file size must be less than 100kb");
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("Thumbnail updated");
  };

  return (
    <main className='main'>
      <div className='login-form'>
        <h2 className='heading-secondary ma-bt-lg'>Log into your account</h2>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form__group'>
            <label className='form__label' htmlFor='name'>
              Name
            </label>
            <input
              className='form__input'
              id='name'
              type='text'
              placeholder='e.g. safwan'
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='email'>
              Email address
            </label>
            <input
              className='form__input'
              id='email'
              type='email'
              placeholder='you@example.com'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='password'>
              Password
            </label>
            <input
              className='form__input'
              id='password'
              type='password'
              placeholder='••••••••'
              required
              minLength='8'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='passwordConfirm'>
              Confirm Password
            </label>
            <input
              className='form__input'
              id='passwordConfirm'
              type='password'
              placeholder='••••••••'
              required
              minLength='8'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className='form__group ma-bt-md'>
            <div className='thumbnail__group'>
              <button
                className='form__label thumbnail-btn'
                type='button'
                onClick={() => avatarInputRef.current.click()}
              >
                Pick an thumbnail
              </button>
              <span className='thumbnail-name'>
                {thumbnail && thumbnail.name}
              </span>
              <input
                style={{ display: "none" }}
                ref={avatarInputRef}
                required
                type='file'
                onChange={handleFileChange}
              />
            </div>
            {thumbnailError && <div className='errorr'>{thumbnailError}</div>}
          </div>
          <div className='form__group'>
            <button className='btn btn--green'>Signup</button>
          </div>
        </form>
      </div>
    </main>
  );
}
export default Signup;
