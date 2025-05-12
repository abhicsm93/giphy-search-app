import SearchForm from "./SearchForm";
import { GiphyObject, DataObject } from "@/lib/types/Giphy";

async function fetchGiphys() {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=cats&api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&limit=10`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Giphy data");
  }
  const result = await response.json();
  return result;
}

export default async function Home() {
  const catGiphys: GiphyObject = await fetchGiphys();
  
  return (
    <>
      <h1 className="text-4xl font-semibold">Giphy Search App</h1>
      <SearchForm initialGliphys={catGiphys}/>
      
    </>
  );
}