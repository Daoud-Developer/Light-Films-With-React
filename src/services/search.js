import axios from "../shared/axios";
export const getSearchKeyword = async (query) => {
    return (await axios.get("/search/keyword", {
        params: {
            query,
        },
    })).data.results
        .map((item) => item.name)
        .filter((_, index) => index < 5);
};
// export const getRecommendGenres = async (): Promise<
//   { id: number; name: string }[]
// > => {
//   const movieGenres = (await axios.get("/genre/movie/list")).data.genres;
//   const tvGenres = (await axios.get("/genre/tv/list")).data.genres;
//   return Array.from(new Set(movieGenres.concat(tvGenres)));
// };
export const getRecommendGenres2 = async () => {
    const movieGenres = (await axios.get("/genre/movie/list")).data.genres;
    const tvGenres = (await axios.get("/genre/tv/list")).data.genres;
    return {
        movieGenres,
        tvGenres,
    };
};
export const getSearchResult = async (typeSearch, query, page) => {
    const data = (await axios.get(`/search/${typeSearch}`, {
        params: {
            query,
            page,
        },
    })).data;
    const results = data.results
        .map((item) => ({
        ...item,
        ...(typeSearch !== "multi" && { media_type: typeSearch }),
    }))
        .filter((item) => item.poster_path || item.profile_path);
    return {
        ...data,
        results,
    };
};
