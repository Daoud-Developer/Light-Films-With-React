import { onSnapshot, } from "firebase/firestore";
import { useEffect, useState } from "react";
export const useCollectionQuery = (id, collection) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(!Boolean(data));
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection, (querySnapshot) => {
            setData(querySnapshot);
            setIsLoading(false);
            setIsError(false);
        }, (error) => {
            console.log(error, 111);
            setData(null);
            setIsLoading(false);
            setIsError(true);
        });
        return () => unsubscribe();
        //collection
        // eslint-disable-next-line
    }, [id]);
    return { isLoading, isError, data };
};
