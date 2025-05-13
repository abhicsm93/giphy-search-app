import Head from "next/head";
import { GiphyObject } from "@/lib/types/Giphy";
import SearchForm from "@/app/SearchForm";
import Link from "next/link";
import { ReactElement } from "react";
import { PageProps } from "@/.next/types/app/page";

/**
 * Fetches Giphy data based on the provided search term.
 * 
 * @param {string} searchTerm - The term to search for Giphy images.
 * @returns {Promise<GiphyObject>} - A promise that resolves to the Giphy data object.
 * @throws {Error} - Throws an error if the API request fails.
 */
async function fetchGiphys(searchTerm: string): Promise<GiphyObject> {
    const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&limit=10`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch Giphy data");
    }
    const result = await response.json();
    return result;
}

/**
 * Server component for displaying search results based on the search term.
 * 
 * @param {Object} props - The props containing the dynamic route parameters.
 * @param {Object} props.params - The dynamic route parameters.
 * @param {string} props.params.searchTerm - The search term from the route.
 * @returns {ReactElement} - The React element for the search results page.
 */
const Search = async (props:PageProps): Promise<ReactElement> => {
    const { searchTerm } = await props.params;
    const catGiphys: GiphyObject = await fetchGiphys(searchTerm);

    return (
        <>
            <Head>
                <title>Search</title>
            </Head>
            <h1 className="text-4xl">Search results for: {searchTerm}</h1>
            <p>
                Share search results with others:{" "}
                <Link href={`/search/${searchTerm}`}>
                    {`http://localhost:3000/search/${searchTerm}`}
                </Link>
            </p>
            <SearchForm initialGliphys={catGiphys} />
        </>
    );
};

export default Search;