import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";
import AddAppointment from "./AddAppointment";
import { useState } from "react";
import DropDown from "./DropDown";

const Search = ({ query, onQueryChange, sortBy, onSortByChange, orderBy, onOrderByChange }) => {
  const [appointment, setappointment] = useState(false);
  const [toggleSort, setToggleSort] = useState(false);
  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
          type="text"
          name="query"
          id="query"
          value={query}
          className="pl-20 rounded-md ring-indigo-500 border-indigo-500 block w-full text-xl bg-red-100"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              onClick={() => {
                setToggleSort(!toggleSort);
              }}
              type="button"
              className="justify-center px-2 mx-1  bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Sort By <BiCaretDown className="ml-2" />
            </button>
            <DropDown
              toggle={toggleSort}
              sortBy={sortBy}
              onSortByChange={(mySort) => {
                onSortByChange(mySort);
              }}
              orderBy={orderBy}
              onOrderByChange={(myOrder) => {
                onOrderByChange(myOrder);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
