import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import OverviewBox from "../components/OverviewBox";

import icons from "../assets/icons.svg";

function Tour() {
  const { id } = useParams();
  const { data, isPending } = useFetch(
    `${import.meta.env.VITE_REMOTE_URL}api/v1/tours/${id}`
  );

  let tour;
  if (data) tour = data.data.data;

  return (
    <Fragment>
      {isPending && <h2 className='loading'>Loading...</h2>}

      {!isPending && tour && (
        <Fragment>
          <section className='section-header'>
            <div className='header__hero'>
              <div className='header__hero-overlay'>&nbsp;</div>
              <img
                className='header__hero-img'
                src={`${import.meta.env.VITE_REMOTE_URL}img/tours/${tour.imageCover}`}
                alt={`${tour.name}`}
              />
            </div>
            <div className='heading-box'>
              <h1 className='heading-primary'>
                <span>{tour.name} tour</span>
              </h1>
              <div className='heading-box__group'>
                <div className='heading-box__detail'>
                  <svg className='heading-box__icon'>
                    <use xlinkHref={`${icons}#icon-clock`}></use>
                  </svg>
                  <span className='heading-box__text'>
                    {tour.duration} days
                  </span>
                </div>
                <div className='heading-box__detail'>
                  <svg className='heading-box__icon'>
                    <use xlinkHref={`${icons}#icon-map-pin`}></use>
                  </svg>
                  <span className='heading-box__text'>
                    {tour.startLocation.description}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className='section-description'>
            <div className='overview-box'>
              <div>
                <div className='overview-box__group'>
                  <h2 className='heading-secondary ma-bt-lg'>Quick facts</h2>
                  {OverviewBox(
                    "Next Date",
                    new Date(tour.startDates[0]).toLocaleString("en-us", {
                      month: "long",
                      year: "numeric",
                    }),
                    "calendar"
                  )}
                  {OverviewBox("Difficulty", tour.difficulty, "trending-up")}
                  {OverviewBox(
                    "Participants",
                    ` ${tour.maxGroupSize} people`,
                    "user"
                  )}
                  {OverviewBox("Rating", `${tour.ratingsAverage} / 5`, "star")}
                  {OverviewBox("Tour provider", tour.tourProvider, "office")}
                </div>

                <div className='overview-box__group'>
                  <h2 className='heading-secondary ma-bt-lg'>
                    Your tour guides
                  </h2>

                  {tour.guides.map((g) => (
                    <div className='overview-box__detail' key={g._id}>
                      <img
                        src={`${import.meta.env.VITE_REMOTE_URL}img/users/${g.photo}`}
                        alt={g.role === "guide" ? "Tour guide" : "Lead guide"}
                        className='overview-box__img'
                      />
                      <span className='overview-box__label'>
                        {g.role === "guide" ? "Tour guide" : "Lead guide"}
                      </span>
                      <span className='overview-box__text'>{g.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='description-box'>
              <h2 className='heading-secondary ma-bt-lg'>
                About {tour.name} tour
              </h2>
              {tour.description.split("\n").map((txt, i) => (
                <p className='description__text' key={i}>
                  {txt}
                </p>
              ))}
            </div>
          </section>

          <section className='section-pictures'>
            {tour.images.map((img, i) => (
              <div className='picture-box' key={i}>
                <img
                  className={`picture-box__img picture-box__img--${i + 1}`}
                  src={`${import.meta.env.VITE_REMOTE_URL}img/tours/${img}`}
                  alt={`${tour.name} Tour ${i + 1}`}
                />
              </div>
            ))}
          </section>

          <section className='section-map'>
            <div id='map'></div>
          </section>

          <section className='section-reviews'>
            <div className='reviews'>
              {tour.reviews.map((r) => (
                <div className='reviews__card' key={r.id}>
                  <div className='reviews__avatar'>
                    <img
                      src={`${import.meta.env.VITE_REMOTE_URL}img/users/${r.user.photo}`}
                      alt={r.user.name}
                      className='reviews__avatar-img'
                    />
                    <h6 className='reviews__user'>{r.user.name}</h6>
                  </div>
                  <p className='reviews__text'>{r.review}</p>
                  <div className='reviews__rating'>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <svg
                        className={`reviews__star reviews__star--${
                          r.rating >= num ? "active" : "inactive"
                        }`}
                        key={num}
                      >
                        <use xlinkHref={`${icons}#icon-star`}></use>
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className='section-cta'>
            <div className='cta'>
              <div className='cta__img cta__img--logo'>
                <img
                  src={`${import.meta.env.VITE_REMOTE_URL}img/logo-white.png`}
                  alt='Tourify logo'
                  className=''
                />
              </div>
              <img
                src={`${import.meta.env.VITE_REMOTE_URL}img/tours/${tour.images[1]}`}
                alt='Tour picture'
                className='cta__img cta__img--1'
              />
              <img
                src={`${import.meta.env.VITE_REMOTE_URL}img/tours/${tour.images[2]}`}
                alt='Tour picture'
                className='cta__img cta__img--2'
              />

              <div className='cta__content'>
                <h2 className='heading-secondary'>What are you waiting for?</h2>
                <p className='cta__text'>
                  {tour.duration} days. 1 adventure. Infinite memories. Make it
                  yours today!
                </p>
                <button className='btn btn--green span-all-rows'>
                  Book tour now!
                </button>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Tour;
