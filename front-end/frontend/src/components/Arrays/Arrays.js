import React, { useState } from "react";

const Arrays = () => {
  const myArray = ["apple", "banana", "cherry", "date", "elderberry"];
  const [searchText, setSearchText] = useState("");
  const [filteredArrayFilter, setFilteredArrayFilter] = useState([]);
  const [filteredArrayForLoop, setFilteredArrayForLoop] = useState([]);

  // Array iteration methods
  const mapItems = myArray.map((item, index) => <li key={index}>{item}</li>);

  const forEachItems = [];
  myArray.forEach((item, index) => {
    forEachItems.push(<li key={index}>{item}</li>);
  });

  const forOfItems = [];
  for (const [index, item] of myArray.entries()) {
    forOfItems.push(<li key={index}>{item}</li>);
  }

  const forLoopItems = [];
  for (let i = 0; i < myArray.length; i++) {
    forLoopItems.push(<li key={i}>{myArray[i]}</li>);
  }

  // Filtering with filter() method
  const handleFilterChangeFilter = (e) => {
    const text = e.target.value;
    setSearchText(text);
    const filtered = myArray.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredArrayFilter(filtered);
  };

  // Filtering with for loop
  const handleFilterChangeForLoop = (e) => {
    const text = e.target.value;
    setSearchText(text);
    const filtered = [];
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].toLowerCase().includes(text.toLowerCase())) {
        filtered.push(myArray[i]);
      }
    }
    setFilteredArrayForLoop(filtered);
  };

  return (
    <div>
      <div>
        {/* Array iteration methods */}
        <h2>Array Iteration Methods:</h2>
        <h3>Using map:</h3>
        <ul>{mapItems}</ul>

        <h3>Using forEach:</h3>
        <ul>{forEachItems}</ul>

        <h3>Using for...of:</h3>
        <ul>{forOfItems}</ul>

        <h3>Using for loop:</h3>
        <ul>{forLoopItems}</ul>
      </div>

      <div>
        {/* Filtering methods */}
        <h2>Search Boxes using Filtering Methods:</h2>

        {/* Search box using filter() method */}
        <h3>Search using filter() method:</h3>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleFilterChangeFilter}
        />
        <ul>
          {filteredArrayFilter.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Search box using for loop */}
        <h3>Search using for loop:</h3>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleFilterChangeForLoop}
        />
        <ul>
          {filteredArrayForLoop.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Arrays;
