import icons from "../assets/icons.svg";

export default function PasswordEye({ passwordVisibility, handleClick }) {
  return (
    <svg onClick={handleClick}>
      <use
        xlinkHref={`${icons}#icon-eye${passwordVisibility ? "-off" : ""}`}
      ></use>
    </svg>
  );
}
