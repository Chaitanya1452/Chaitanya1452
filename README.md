Google Sheets Clone

Overview

Google Sheets Clone is a web-based spreadsheet application that mimics the functionality of Google Sheets. It supports various data entry, mathematical functions, data quality operations, and additional features like data visualization and file management.

Features

Core Spreadsheet Features:

Add/Delete Rows and Columns

Cell Editing with Real-time Updates

Support for Multiple Data Types (Numbers, Text, Dates)

Basic Data Validation to Ensure Numeric Inputs in Numeric Fields

Mathematical Functions:

SUM: Calculates the sum of selected numerical cells.

AVERAGE: Computes the average of the selected range.

MAX: Finds the maximum value in the selected range.

MIN: Finds the minimum value in the selected range.

COUNT: Counts the number of numeric cells in the selected range.

Data Quality Functions:

TRIM: Removes leading and trailing whitespace from a cell.

UPPER: Converts the text in a selected cell to uppercase.

LOWER: Converts the text in a selected cell to lowercase.

REMOVE DUPLICATES: Eliminates duplicate rows based on the first two columns.

FIND AND REPLACE: Allows users to find and replace specific text within a range of cells.

Bonus Features:

Data Visualization: Supports charts and graphs to visualize spreadsheet data.

Cell Referencing: Supports relative and absolute cell references.

File Management: Allows saving and loading of spreadsheets.

Tech Stack

Frontend: React.js

Libraries:

Chart.js for visualization

React State Management for handling user interactions

Installation

Clone the repository:

git clone https://github.com/your-username/google-sheets-clone.git
cd google-sheets-clone

Install dependencies:

npm install

Start the application:

npm start

Open http://localhost:3000 in your browser.

How to Use

Enter data directly into cells by clicking on them.

Use function buttons (SUM, AVERAGE, MAX, MIN, COUNT) to perform calculations on a selected range.

Click on any cell and use TRIM, UPPER, LOWER to modify the text.

Use REMOVE DUPLICATES to eliminate duplicate rows.

Use FIND AND REPLACE to search and replace text in cells.

Add/Delete rows or columns as needed.

Known Issues

Some advanced Google Sheets functions (e.g., complex formulas) are not yet supported.

Drag-and-drop support for cells is not implemented.

Future Enhancements

Full formula support

Export and import functionality

Cloud storage integration

Contribution

Feel free to contribute by submitting pull requests and reporting issues.

License

This project is licensed under the MIT License.

