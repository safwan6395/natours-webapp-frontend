import TourCard from "../components/TourCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetch } from "../hooks/useFetch";

function Overview() {
  const { token } = useAuthContext();

  const { data, isPending } = useFetch(
    `${import.meta.env.VITE_REMOTE_URL}api/v1/tours`,
    token
  );

  return (
    <main className='main'>
      {isPending && <h2 className='loading'>Loading...</h2>}
      {!isPending && (
        <div className='card-container'>
          {data &&
            data.status === "success" &&
            data.data.data.map((t) => <TourCard tour={t} key={t.id} />)}
        </div>
      )}
    </main>
  );
}

export default Overview;
