import axios from "../shared/axios";
export const getTVFullDetail = async (id) => {
    const response = await Promise.all([
        axios.get(`/tv/${id}`),
        axios.get(`/tv/${id}/credits`),
        axios.get(`/tv/${id}/reviews`),
        axios.get(`/tv/${id}/similar`),
        axios.get(`/tv/${id}/videos`),
    ]);
    const tvInfo = response.reduce((final, current, index) => {
        switch (index) {
            case 0:
                final.detail = { ...current.data, media_type: "tv" };
                break;
            case 1:
                final.credits = current.data.cast.slice(0, 8);
                break;
            case 2:
                final.reviews = current.data.results.filter((item) => item.author !== "MSB");
                break;
            case 3:
                final.similar = current.data.results.map((item) => ({
                    ...item,
                    media_type: "tv",
                }));
                break;
            case 4:
                final.videos = current.data.results
                    .filter((item) => item.site === "YouTube")
                    .reduce((acc, current) => {
                    if (current.type === "Trailer")
                        return [current, ...acc];
                    else
                        return [...acc, current];
                }, []);
                break;
        }
        return final;
    }, {});
    return tvInfo;
};
export const getWatchTV = async (id) => {
    const res = await Promise.all([
        axios.get(`/tv/${id}`),
        axios.get(`/tv/${id}/recommendations`),
    ]);
    const data = {
        detail: res[0].data,
        recommendations: res[1].data.results,
    };
    const detailSeasons = (await Promise.all(data.detail.seasons.map((season) => axios.get(`/tv/${id}/season/${season.season_number}`)))).map((res) => res.data);
    return { ...data, detailSeasons };
};
