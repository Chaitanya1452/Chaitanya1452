import React, { useState } from "react";
import "./App.css";

const Spreadsheet = () => {
  const [data, setData] = useState([
    ["ID", "Name", "Age"],
    [1, "Alice", 25],
    [2, "Bob", 30],
    [3, "Charlie", 35],
  ]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [range, setRange] = useState("");
  const [result, setResult] = useState(null);

  // Handle data changes in a cell
  const handleCellChange = (row, col, value) => {
    const newData = [...data];
    newData[row][col] = isNaN(value) ? value : Number(value); // Ensure numeric input is treated as a number
    setData(newData);
  };

  // Add a new row
  const addRow = () => {
    setData([...data, new Array(data[0].length).fill("")]);
  };

  // Add a new column
  const addColumn = () => {
    setData(data.map(row => [...row, ""]));
  };

  // Delete the last column
  const deleteColumn = () => {
    if (data[0].length > 1) {
      setData(data.map(row => row.slice(0, -1)));
    }
  };

  // Delete the last row
  const deleteRow = () => {
    if (data.length > 1) {
      setData(data.slice(0, -1));
    }
  };

  // Parse the range entered by the user
  const parseRange = (range) => {
    const match = range.match(/([A-Z])(\d+):([A-Z])(\d+)/);
    if (!match) return null;
    const [, startCol, startRow, endCol, endRow] = match;
    const colIdx = (char) => char.charCodeAt(0) - 65;
    return {
      startRow: parseInt(startRow, 10),
      endRow: parseInt(endRow, 10),
      startCol: colIdx(startCol),
      endCol: colIdx(endCol),
    };
  };

  // Get values from the selected range
  const getRangeValues = (parsed) => {
    if (!parsed) return [];
    const { startRow, endRow, startCol, endCol } = parsed;
    let values = [];
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const cellValue = data[r]?.[c];
        if (typeof cellValue === "number") {
          values.push(cellValue);
        }
      }
    }
    return values;
  };

  // Perform calculations on the selected range
  const calculateFunction = (type) => {
    const parsed = parseRange(range);
    const values = getRangeValues(parsed);
    if (values.length === 0) return;

    let res = 0;
    switch (type) {
      case "SUM":
        res = values.reduce((acc, val) => acc + val, 0);
        break;
      case "AVERAGE":
        res = values.reduce((acc, val) => acc + val, 0) / values.length;
        break;
      case "MAX":
        res = Math.max(...values);
        break;
      case "MIN":
        res = Math.min(...values);
        break;
      case "COUNT":
        res = values.length;
        break;
      default:
        return;
    }
    setResult(res);
  };

  // Trim spaces from a cell
  const trimCell = () => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newData = [...data];
      newData[row][col] = newData[row][col].trim();
      setData(newData);
    }
  };

  // Convert text to uppercase
  const upperCaseCell = () => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newData = [...data];
      newData[row][col] = newData[row][col].toUpperCase();
      setData(newData);
    }
  };

  // Convert text to lowercase
  const lowerCaseCell = () => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newData = [...data];
      newData[row][col] = newData[row][col].toLowerCase();
      setData(newData);
    }
  };

  // Remove duplicate rows in a range
  const removeDuplicates = () => {
    const newData = [...data];
    const uniqueData = newData.filter(
      (value, index, self) => index === self.findIndex((t) => t[0] === value[0] && t[1] === value[1])
    );
    setData(uniqueData);
  };

  // Find and replace text in a range
  const findAndReplace = (find, replace) => {
    const newData = data.map((row) =>
      row.map((cell) => (typeof cell === "string" && cell.includes(find) ? cell.replace(find, replace) : cell))
    );
    setData(newData);
  };

  return (
    <div className="container">
      <h2>Google Sheets Clone</h2>
      <button onClick={addRow}>+ Add Row</button>
      <button onClick={addColumn}>+ Add Column</button>
      <button onClick={deleteColumn}>- Delete Column</button>
      <button onClick={deleteRow}>- Delete Row</button>
      <br /><br />
      <input
        type="text"
        placeholder="Enter range (e.g., A1:A5)"
        value={range}
        onChange={(e) => setRange(e.target.value)}
      />
      <button onClick={() => calculateFunction("SUM")}>SUM</button>
      <button onClick={() => calculateFunction("AVERAGE")}>AVERAGE</button>
      <button onClick={() => calculateFunction("MAX")}>MAX</button>
      <button onClick={() => calculateFunction("MIN")}>MIN</button>
      <button onClick={() => calculateFunction("COUNT")}>COUNT</button>
      {result !== null && <p>Result: {result}</p>}
      
      <div>
        <button onClick={trimCell}>TRIM</button>
        <button onClick={upperCaseCell}>UPPER</button>
        <button onClick={lowerCaseCell}>LOWER</button>
        <button onClick={removeDuplicates}>REMOVE DUPLICATES</button>
        <button onClick={() => findAndReplace("find", "replace")}>FIND AND REPLACE</button>
      </div>

      <table>
        <thead>
          <tr>
            {data[0].map((col, index) => (
              <th key={index}>{String.fromCharCode(65 + index)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  contentEditable
                  onInput={(e) => handleCellChange(rowIndex + 1, colIndex, e.target.innerText)}
                  onClick={() => setSelectedCell({ row: rowIndex + 1, col: colIndex })}
                  style={{ minWidth: "100px", height: "30px", border: "1px solid #ddd", padding: "5px" }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
