import "./App.css";
import { useState } from "react";
function App() {
  const [value, setValue] = useState(0);
  const [result, setResult] = useState(0);

  const Submit = (e) => {
    e.preventDefault();
    setResult(value);
    translateToString(fibonacci(result));
    setValue(0);
  };

  const fibonacci = (n) => {
    // we will be using array in array instead of number
    let array = [[0], [1]];
    for (let i = 2; i <= value; i++) {
      array.push(add(array[i - 2], array[i - 1]));
    }
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
    // if arr1 = [1,2,4,5] and arr2 = [1, 5, 1, 3, 5] it will conver arr1 to [1,2,4,5,0]
    if (arr1 > arr2) {
      arr2 = convert(arr2, arr1.length);
    } else if (arr1 < arr2) {
      arr1 = convert(arr1, arr2.length);
    }
    // sum is the number we
    let sum = [];
    let transfer = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] + arr2[i] + transfer < 10) {
        sum[i] = arr1[i] + arr2[i] + transfer;
      } else {
        sum[i] = (arr1[i] + arr2[i] + transfer) % 10;
        transfer = 1;
      }
    }
    if (transfer) {
      sum.push(transfer);
    }
    return sum;
  };
  const translateToString = (arr) => {
    let string = "";
    for (let i = arr.length - 1; i >= 0; i++) {
      string = string + arr[i];
    }
    return string;
  };
  return (
    <div className="App">
      <form onSubmit={Submit}>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button>Get Fib</button>
      </form>
      {result !== 0 ? (
        <p>
          The {value} number in the Fibonacci sequentce is {result}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
