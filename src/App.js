import React, { useState } from "react";
import "./styles.css";
import gif from "./giphy 2.gif";
export default function App() {
  var least = Number.MAX_SAFE_INTEGER;
  var formattedDate = new Array(6);
  var [palindrome, chkPalindrome] = useState("Enter Your Birthday");
  var [date, setDate] = useState();
  const addMissingZeros = (date) => (/^\d$/.test(date) ? `0${date}` : date);
  function inputDate(event) {
    var birthDate = new Date(event.target.value);
    date = birthDate;
    setDate(date);
  }
  function formatter(date, type, readable) {
    var birthYear = date.getFullYear();
    var birthMonth = addMissingZeros(date.getMonth() + 1);
    var birthDt = addMissingZeros(date.getDate() + 1);
    var birthMonth2 = date.getMonth() + 1;
    if (type === 1) {
      return readable
        ? `${birthMonth}-${birthDt}-${birthYear}`
        : `${birthYear}${birthMonth}${birthDt}`;
    } else if (type === 2) {
      return readable
        ? `${birthDt}-${birthMonth}-${birthYear}`
        : `${birthDt}${birthMonth}${birthYear}`;
    } else if (type === 3) {
      return readable
        ? `${birthMonth}-${birthDt}-${addMissingZeros(birthYear % 100)}`
        : `${birthMonth}${birthDt}${addMissingZeros(birthYear % 100)}`;
    } else if (type === 4) {
      return readable
        ? `${birthDt}-${birthMonth}-${addMissingZeros(birthYear % 100)}`
        : `${birthDt}${birthMonth}${addMissingZeros(birthYear % 100)}`;
    } else if (type === 5) {
      return readable
        ? `${birthMonth2}-${birthDt}-${birthYear}`
        : `${birthMonth2}${birthDt}${birthYear}`;
    } else if (type === 6) {
      return readable
        ? `${birthDt}-${birthMonth2}-${birthYear}`
        : `${birthDt}${birthMonth2}${birthYear}`;
    }
  }
  function clickHandler() {
    if (date === undefined) {
      alert("enter date");
    } else if (date !== undefined) {
      chkPalindrome(<img style={{ marginTop: "1rem" }} src={gif}></img>);
      setTimeout(() => {
        for (var a = 0; a < 6; a++) {
          formattedDate[a] = formatter(date, a + 1);
          console.log(formattedDate[a]);
          if (
            formattedDate[a] === formattedDate[a].split("").reverse().join("")
          ) {
            palindrome = "Yes a palindrome";
            chkPalindrome(palindrome);
          } else if (
            formattedDate[a] !== formattedDate[a].split("").reverse().join("")
          ) {
            getPalindromeDates(date);
          }
        }
      }, 3000);
    }
  }

  function getPalindromeDates(date, palindromesToShow = 9) {
    var givenYear = date.getFullYear() - 1;
    var givenMonth = addMissingZeros(date.getMonth() + 1);
    var givenDt = addMissingZeros(date.getDate());
    let daten = new Date(givenYear, givenMonth, givenDt);
    for (
      let i = 0;
      i < palindromesToShow;
      daten = new Date(daten.setDate(daten.getDate() + 1))
    ) {
      for (var j = 0; j < 6; j++) {
        formattedDate[j] = formatter(daten, j + 1);
        if (
          formattedDate[j] === formattedDate[j].split("").reverse().join("")
        ) {
          i++;
          var diff = Math.abs(
            Math.floor((date.getTime() - daten.getTime()) / (1000 * 3600 * 24))
          );
          if (diff < least && diff !== 0) {
            least = diff;
            palindrome =
              "Oops!! your birthday is not palindrome. Nearest palindrome date is '" +
              formatter(daten, j + 1, true) +
              "' you missed it by  '" +
              Math.abs(Math.floor(diff)) +
              "' days ";
            chkPalindrome(palindrome);
          }
        }
      }
    }
  }

  return (
    <div className="App">
      <input type="date" onChange={inputDate} />
      <button onClick={clickHandler}>check palindrome</button>
      <h1>{palindrome}</h1>
    </div>
  );
}
