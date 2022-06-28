import React, { useState } from "react";

/**
  Characters that Google replaces in the search query
*/
const SPECIAL_CHARACTERS: specialCharacter[] = [
  { searchValue: "%", replaceValue: "%25" },
  { searchValue: "+", replaceValue: "%2B" },
  { searchValue: "?", replaceValue: "%3F" },
  { searchValue: "=", replaceValue: "%3D" },
  { searchValue: "&", replaceValue: "%26" },
  { searchValue: "/", replaceValue: "%2F" },
  { searchValue: "{", replaceValue: "%7B" },
  { searchValue: "}", replaceValue: "%7D" },
  { searchValue: "(", replaceValue: "%28" },
  { searchValue: "(", replaceValue: "%29" },
  { searchValue: "$", replaceValue: "%24" },
  { searchValue: "#", replaceValue: "%23" },
  { searchValue: "!", replaceValue: "%21" },
  { searchValue: ",", replaceValue: "%2C" },
  { searchValue: ";", replaceValue: "%3B" },
];
/**
  Formats the given string in a google query format
*/
const formatQuery = (string: string) => {
  let formattedString = string;
  SPECIAL_CHARACTERS.forEach(({ searchValue, replaceValue }) => {
    formattedString = formattedString.replaceAll(searchValue, replaceValue);
  });
  return formattedString.split(" ").join("+");
};

function App() {
  // State for the textarea
  const [searchWords, setSearchWords] = useState("");
  const search = () => {
    const query = formatQuery(searchWords);
    const googleURL = "https://www.google.com/search?q=" + query;
    chrome.tabs.create({ url: googleURL });
  };
  return (
    <div className="py-4 px-8 bg-slate-800 flex flex-col space-y-4">
      <textarea
        className=" py-1 px-2 rounded h-20 resize-none bg-slate-200 placeholder:font-medium placeholder:text-slate-500 focus:placeholder:text-slate-400 focus:outline-none focus:border-2 focus:border-green-500 focus:bg-white"
        placeholder="Palabras a buscar"
        value={searchWords}
        onChange={({ target }) => setSearchWords(target.value)}
      ></textarea>
      <button
        className=" w-min bg-green-400 px-3 py-1.5 rounded-md font-medium text-slate-800 hover:bg-green-500 hover:text-slate-900"
        onClick={search}
      >
        Buscar
      </button>
    </div>
  );
}

export default App;
