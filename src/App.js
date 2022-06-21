import './App.css';
import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);


  // This function mocks a simple synchronous API to fetch the label list by keyword.
  // Example:
  //  const val = getLabels('C');
  //  console.log(val);
  function getLabels(keyword) {
    const allLabels = ['NextActions', 'Someday_Actions', 'Costco', 'Alexa'];
    const result = allLabels
      .filter(function (x) {
        return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
    return result;
  }

  // This function mocks the asynchronous API to fetch the label list by keyword.
  // Example:
  //  getLabelsAsync('C').then(function(val) {
  //     console.log(val);
  //  })
  function getLabelsAsync(keyword) {
    const result = getLabels(keyword);
    const delay = Math.random() * 800 + 200; // delay 200~1000ms
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, delay, result);
    });
  }

  const handleChange = (e) => {
    let value = e.target.value
    console.log(value);
    var start = value.indexOf('@');
    if (start > -1) {
      var words = value.substring(start + 1, value.length);
      getLabelsAsync(words).then(function (val) {
        setItems(val);
      })
    }
    else {
      setItems([])
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='dropdown'>
          <div>
            <input className='input' type={"text"} onChange={(e) => handleChange(e)} />
          </div>
          <div className='content'>           
              {items.map((ele, i) => {
                return  <option className='item' key={i}>{ele}</option>
              })}            
          </div>
        </div>
      </header>
    </div>
  );
}



