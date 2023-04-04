import { useQuery } from "@tanstack/react-query";
import { getTrendingNow } from "../../services/home";
import RightbarFilms from "../Common/RightbarFilms";
const TrendingNow = () => {
    const { isLoading, data, isError, error } = useQuery(["trending"], getTrendingNow);
    if (isError)
        return <div>ERROR: ${error.message}</div>;
    // if (isLoading) return <div>Loading...</div>;
    return (<RightbarFilms className="mt-7" name="Trending" limitNumber={2} films={data} isLoading={isLoading}/>);
};
export default TrendingNow;
