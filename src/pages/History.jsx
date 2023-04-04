import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Title from "../components/Common/Title";
import FilmListViewForBookmarkAndHistory from "../components/FilmListViewForBookmarkAndHistory/FilmListViewForBookmarkAndHistory";
import Footer from "../components/Footer/Footer";
import { db } from "../shared/firebase";
import { useAppSelector } from "../store/hooks";
const History = () => {
    const currentUser = useAppSelector((state) => state.auth.user);
    const [recentlyWatchFilms, setRecentlyWatchFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(!Boolean(recentlyWatchFilms.length));
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        if (!currentUser)
            return;
        const unsubDoc = onSnapshot(doc(db, "users", currentUser?.uid), (doc) => {
            setRecentlyWatchFilms(doc.data()?.recentlyWatch.slice().reverse());
            setIsLoading(false);
        }, (error) => {
            alert(error);
            setRecentlyWatchFilms([]);
            setIsLoading(false);
            setIsError(true);
        });
        return () => unsubDoc();
    }, [currentUser]);
    if (isError)
        return <div>ERROR</div>;
    return (<>
      <Title value="History | Moonlight"/>
      <FilmListViewForBookmarkAndHistory films={recentlyWatchFilms} isLoading={isLoading} pageType="history"/>

      <Footer />
    </>);
};
export default History;
