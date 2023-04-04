import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FilmDetail from "../../components/FilmDetail/FilmDetail";
import { getTVFullDetail } from "../../services/tv";
import Error from "../Error";
const TVInfo = () => {
    const { id } = useParams();
    const { data, isError, error } = useQuery(["tvDetail", id], () => getTVFullDetail(Number(id)));
    // if (isError) return <div>ERROR: {error.message}</div>;
    if (isError)
        return <Error />;
    // if (isLoading) return <div>Loading...</div>;
    return <FilmDetail {...data}/>;
};
export default TVInfo;
