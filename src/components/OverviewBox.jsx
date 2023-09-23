import icons from "../assets/icons.svg";

export default function OverviewBox(label, text, icon) {
  return (
    <div className='overview-box__detail'>
      <svg className='overview-box__icon'>
        <use xlinkHref={`${icons}#icon-${icon}`}></use>
      </svg>
      <span className='overview-box__label'>{label}</span>
      <span className='overview-box__text'>{text}</span>
    </div>
  );
}
