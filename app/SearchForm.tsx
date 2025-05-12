'use client'

import { useState, useEffect } from "react";
import { GiphyObject, DataObject } from "@/lib/types/Giphy";

interface SearchFormProps {
    initialGliphys: GiphyObject;
}

const SearchForm = ({ initialGliphys }: SearchFormProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [giphys, setGiphys] = useState<GiphyObject>(initialGliphys);
    const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&limit=10`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch Giphy data");
        }
        const result = await response.json();
        setGiphys(result);
    };
    const onSearchInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="flex-col gap-20">
            <form onSubmit={onSubmitHandle}>
                <input name="search-box" onChange={onSearchInputHandle} type="text" required />
                <button type="submit">Search</button>
            </form>
            <div className="grid grid-cols-3">
                {giphys.data.map((item: DataObject) => (
                    <div key={item.id}>
                        <h3 className="text-2xl font-semibold">
                            {item.title}
                        </h3>
                        <img src={item.images.original.url} alt={item.title} />
                    </div>
                ))}
            </div>
        </ div>
    )
}


export default SearchForm;