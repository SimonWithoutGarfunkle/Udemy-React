import { useEffect } from "react";
import { useState } from "react";

export function useFetch(fetchFunction) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState();


    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFunction();
                setFetchedData(data);
            } catch (error) {
                setError({ message: error.message || 'failed to fetch data' });
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFunction]);

    return { isFetching, fetchedData, error, setFetchedData, setIsFetching };
}