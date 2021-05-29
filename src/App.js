import "./App.css";
import { useState } from "react";
function App() {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(0);

  const Submit = (e) => {
    e.preventDefault();
    setResult(translateToString(fibonacci(value)));
    setInputValue(value);
    setValue("");
  };

  const fibonacci = (n) => {
    // we will be using array in array instead of number
    let array = [[0], [1]];
    for (let i = 2; i <= n; i++) {
      array.push(add(array[i - 1], array[i - 2]));
    }
    return array[n];
  };

  // function that takes an array and length as an arguemnt. Then it converts the array into the same length and pushes undefined to 0 beacause undefined cannot be used in mathematical calculation
  const convert = (array, length) => {
    for (let i = 0; i < length; i++) {
      if (array[i] === undefined) {
        array[i] = 0;
      }
    }
    return array;
  };
  //adds two arrays
  const add = (arr1, arr2) => {
    // checks if array length is equal if not calls the convert function
    // if arr1 = [1,2,4,5] and arr2 = [1, 5, 1, 3, 5] it will convert arr1 to [1,2,4,5,0]
    if (arr1.length > arr2.length) {
      arr2 = convert(arr2, arr1.length);
    } else if (arr1.length < arr2.length) {
      arr1 = convert(arr1, arr2.length);
    }
    // sum is the array we push to when we add each element from arr1 and arr2
    let sum = [];
    let transfer = 0;
    for (let i = 0; i < arr1.length; i++) {
      // if the sum[i] is single digit then we just push it directly to sum

      if (arr1[i] + arr2[i] + transfer < 10) {
        sum[i] = arr1[i] + arr2[i] + transfer;
        transfer = 0;
      } else {
        //else we push the remainder for eg (9+8+0)%10 = 7 and set transfer to 1
        sum[i] = (arr1[i] + arr2[i] + transfer) % 10;
        transfer = 1;
      }
    }
    //if transfer is 1 we push it to the sum
    if (transfer) {
      sum.push(transfer);
    }
    return sum;
  };

  //convert the array to string
  //[1,2,4,5,6,7] =====> '765421'
  const translateToString = (array) => {
    var str = "";
    for (let i = array.length - 1; i >= 0; i--) {
      str = str + array[i];
    }
    return str;
  };
  return (
    <div className="App">
      <h1>Fibonacci</h1>
      <form className="form" onSubmit={Submit}>
        <input
          type="text"
          placeholder="Enter a number"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button className="button">Get Fib</button>
      </form>

      {result !== 0 ? (
        <div className="result">
          <p>The {inputValue} number in fibonacci sequence is :</p>

          <p>{result}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
