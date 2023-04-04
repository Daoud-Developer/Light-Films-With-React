import axios from "../shared/axios";
export const getExploreMovie = async (page, config = {}) => {
    const data = (await axios.get("/discover/movie", {
        params: {
            ...config,
            page,
        },
    })).data;
    const adjustedItems = data.results
        .filter((item) => item.poster_path)
        .map((item) => ({
        ...item,
        media_type: "movie",
    }));
    return {
        ...data,
        results: adjustedItems,
    };
};
export const getExploreTV = async (page, config = {}) => {
    const data = (await axios.get("/discover/tv", {
        params: {
            ...config,
            page,
        },
    })).data;
    const adjustedItems = data.results
        .filter((item) => item.poster_path)
        .map((item) => ({
        ...item,
        media_type: "tv",
    }));
    return {
        ...data,
        results: adjustedItems,
    };
};
