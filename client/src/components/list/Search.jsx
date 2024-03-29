import { useEffect, useState } from "react"

const Search = ({ places, setFiltered }) => {

    const [search, setSearch] = useState("");

    const searchHandle = (event) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        if(search === ""){
            setFiltered(places);
            return;
        }
        const searchFiltered = places.filter(
            (place) => (
                place.name.toLocaleLowerCase("tr-TR").includes(search.toLocaleLowerCase("tr-TR"))
            )
        );
        setFiltered(searchFiltered);
    }, [search, places, setFiltered]);


  return (
    <div className="searchbar col-sm-12 my-2">
        <input className="form-control" id="searchInput" type="text" placeholder="Couldn't find your spot?!" aria-label="Search" onChange={searchHandle} />
    </div>
  )
}

export default Search
