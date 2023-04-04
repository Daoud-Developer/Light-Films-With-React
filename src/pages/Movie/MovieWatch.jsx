import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FilmWatch from "../../components/FilmWatch/FilmWatch";
import { getWatchMovie } from "../../services/movie";
import Error from "../Error";
const MovieWatch = () => {
    const { id } = useParams();
    const { data, error } = useQuery(["watchMovie", id], () => getWatchMovie(Number(id)));
    // if (error) return <div>ERROR: {error.message}</div>;
    if (error)
        return <Error />;
    // if (!data) return <div>Loading...</div>;
    return <FilmWatch {...data} media_type="movie"/>;
};
export default MovieWatch;
