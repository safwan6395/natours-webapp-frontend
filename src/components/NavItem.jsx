import icons from "../assets/icons.svg";

export default function NavItem({ link, text, icon, active }) {
  return (
    <li className={active ? "side-nav--active" : ""}>
      <a href={link}>
        <svg>
          <use xlinkHref={`${icons}#${icon}`}></use>
        </svg>
        {text}
      </a>
    </li>
  );
}
