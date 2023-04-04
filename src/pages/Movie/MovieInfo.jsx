import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FilmDetail from "../../components/FilmDetail/FilmDetail";
import { getMovieFullDetail } from "../../services/movie";
import Error from "../Error";
const MovieInfo = () => {
    const { id } = useParams();
    const { data, isError, error } = useQuery(["movieDetail", id], () => getMovieFullDetail(Number(id)));
    // if (isError) return <div>ERROR: {error.message}</div>;
    if (isError)
        return <Error />;
    // if (isLoading) return <div>Loading...</div>;
    return <FilmDetail {...data}/>;
};
export default MovieInfo;
