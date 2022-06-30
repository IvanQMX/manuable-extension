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

function scrollDown() {
  alert("Hola");
  // const { documentElement } = document;
  // let time = setInterval(() => {
  //   if (window.scrollY < documentElement.scrollHeight - documentElement.clientHeight) {
  //     window.scrollBy(0, 1);
  //   } else {
  //     clearInterval(time);
  //   }
  // }, 10);
}

function App() {
  // State for the textarea
  const [searchWords, setSearchWords] = useState("");
  const search = async () => {
    const query = formatQuery(searchWords);
    const googleURL = "https://www.google.com/search?q=" + query;
    chrome.runtime.sendMessage({
      type: "new_tab",
      url: googleURL,
    })
  };
  return (
    <div className="flex flex-col px-8 py-4 space-y-4 bg-slate-800">
      <textarea
        className="h-20 px-2 py-1 rounded resize-none bg-slate-200 placeholder:font-medium placeholder:text-slate-500 focus:placeholder:text-slate-400 focus:outline-none focus:border-2 focus:border-green-500 focus:bg-white"
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
