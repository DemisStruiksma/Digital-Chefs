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
    const url = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + clientId;
    
    axios.get(url).then((response) => {
      console.log(response);
      setResult(response.data.results);
    });
  };

  return (
    <div>
      <form>
        <input onChange={handleChange} type="text"  placeholder="Search for images"/>
        <button onClick={handleSubmit} type="submit">Search</button>
      </form>

      <ul>
        {result.map((image) => (
            <li key={image.id}>
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