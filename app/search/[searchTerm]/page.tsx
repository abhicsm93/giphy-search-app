
import Head from "next/head";
import { GiphyObject } from "@/lib/types/Giphy";
import SearchForm from "@/app/SearchForm";
import Link from "next/link";

async function fetchGiphys(searchTerm: string) {
    const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&limit=10`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch Giphy data");
    }
    const result = await response.json();
    return result;
}
interface SearchProps {
    params: {
        searchTerm: string;
    }
}
const Search = async ({ params }: SearchProps) => {
    const { searchTerm } = await params;
    const catGiphys: GiphyObject = await fetchGiphys(searchTerm);
    return (
        <>
            <Head>
                <title>Search</title>
            </Head>
            <h1 className="text-4xl">Search results for: {searchTerm}</h1>
            <p>Share search results with others: <Link href="/search/[pid]" as={`search/${searchTerm}`}> {`http://localhost:3000/search/${searchTerm}`}</Link></p>
            <SearchForm initialGliphys={catGiphys} />
        </>
        
    )
};

export default Search;