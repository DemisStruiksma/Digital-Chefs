import React from 'react';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import ModalImage from "react-modal-image";


function App() {
  const [image, setImage] = useState("");
  const clientId = "0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23";
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(image.length > 1) {
      const url = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + clientId;
    
      axios.get(url).then((response) => {
        setResult(response.data.results);

        if(response.data.results.length < 1) {
          alert('No results for this search query')
        }
      });
    } else {
      alert('Please fill in the search field')
    }   
  };

  return (
    <div className="container mx-auto px-10 pt-10">

      <form className="flex items-center justify-center space-x-5">
        <div className="flex border-2 border-blue-500 rounded">
            <input 
              onChange={handleChange} 
              type="text" className="px-4 py-2 w-80" 
              placeholder="Search for an image..." 
            />

            <button 
              onClick={handleSubmit} 
              className="flex items-center justify-center px-4 border-l"
            >
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
            </button>
        </div>
      </form>

      <ul className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto mt-10">
        {result.map((image) => (
            <li 
              key={image.id} 
              className="w-full rounded outline outline-offset-2 outline-1"
            >
              <ModalImage
                small={image.urls.thumb}
                large={image.urls.full}
                alt={image.alt_description}
              />
            </li>
          )
        )}
      </ul>

    </div>
  );
}

export default App;