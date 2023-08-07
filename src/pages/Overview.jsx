import { useEffect, useState } from "react";
import TourCard from "../components/TourCard";

function Overview() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAllTours() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/v1/tours");

        const { data } = await res.json();

        setTours(data.data);
      } catch (err) {
        console.error("something went wrong while fetching tours");
      }
      setIsLoading(false);
    }

    getAllTours();
  }, []);

  return (
    <main className='main'>
      {isLoading && <h2 className='loading'>Loading...</h2>}
      {!isLoading && (
        <div className='card-container'>
          {tours.map((t) => (
            <TourCard tour={t} key={t.id} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Overview;
