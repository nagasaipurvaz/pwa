import React, {useState} from 'react';
import './form.css';
import axios from 'axios';


const Anagrams = () => {
  const [documents, setDocuments] = useState([]);

  setTimeout(() => {
    axios.get('http://127.0.0.1:8000/api/ngrams-comparison/')  // Make sure this URL matches your Django API endpoint
    .then(function(response) {
      const last_three = response.data.ngrams_data.slice(-2)
      setDocuments(last_three,[])
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, 5000)

   return ( 
    <div className="app-container">
      <h1>Ngrams</h1>
      <ul className="document-list">
        {documents.map((doc, index) => (
          <li key={index} className="document-item">
            <strong>Text:</strong> {doc.text} <br />
            <strong>Ngrams:</strong> {JSON.stringify(doc.ngrams)}
          </li>
        ))}
      </ul>
    </div>

   )
};

export default Anagrams;