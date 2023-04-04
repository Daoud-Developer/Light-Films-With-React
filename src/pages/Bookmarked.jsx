import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Title from "../components/Common/Title";
import FilmListViewForBookmarkAndHistory from "../components/FilmListViewForBookmarkAndHistory/FilmListViewForBookmarkAndHistory";
import Footer from "../components/Footer/Footer";
import { db } from "../shared/firebase";
import { useAppSelector } from "../store/hooks";
const Bookmarked = () => {
    const currentUser = useAppSelector((state) => state.auth.user);
    const [bookmarkedFilms, setBookmarkedFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(!Boolean(bookmarkedFilms.length));
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        if (!currentUser)
            return;
        const unsubDoc = onSnapshot(doc(db, "users", currentUser?.uid), (doc) => {
            setBookmarkedFilms(doc.data()?.bookmarks.slice().reverse());
            setIsLoading(false);
        }, (error) => {
            alert(error);
            setBookmarkedFilms([]);
            setIsLoading(false);
            setIsError(true);
        });
        return () => unsubDoc();
    }, [currentUser]);
    if (isError)
        return <div>ERROR</div>;
    return (<>
      <Title value="Bookmark | Moonlight"/>

      <FilmListViewForBookmarkAndHistory films={bookmarkedFilms} isLoading={isLoading} pageType="bookmark"/>
      <Footer />
    </>);
};
export default Bookmarked;
