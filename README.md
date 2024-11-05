# ClearCapital

ClearCapital is a finance visualization web app built with **Next.js** that allows users to compare real estate and mutual fund investment projections over time. This tool provides visual insights with charts and tables to help track financial growth, taking into account various factors such as inflation rates, appreciation rates, and withdrawal amounts.

## Features

- **Dynamic Financial Projections**: Calculate and visualize financial projections for real estate and mutual funds.
- **Customizable Inputs**: Input different annual appreciation rates, inflation rates, and withdrawal amounts for a personalized analysis.
- **Interactive Charts and Tables**: View results in a line chart or table format for a clearer comparison of investment values.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used

- **Next.js**: React framework for server-rendered applications.
- **Recharts**: For data visualization in charts.
- **Tailwind CSS**: For responsive and modern styling.

## Getting Started

Follow these instructions to set up and run ClearCapital locally.

### Prerequisites

- **Node.js** (v14 or above)
- **npm** or **yarn** (for managing dependencies)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aadarsharma/ClearCapital.git
   cd ClearCapital
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Visit the Application**
   Open your browser and navigate to `http://localhost:3000` to view ClearCapital.

## Usage

1. **Input Investment Details**: Enter your initial investment, appreciation rates, CAGR for mutual funds, inflation rates, and annual withdrawals.
2. **Calculate**: Click "Calculate" to generate projections.
3. **View Results**: Switch between "Chart" and "Table" views to analyze the results visually or numerically.

## Project Structure

Here's a brief overview of the project's structure:

```plaintext
clearcapital/
├── app/
│   ├── components/
│   │   ├── FinancialForm.jsx          # Form for inputting financial data
│   │   ├── ResultsTable.jsx           # Displays results in a table
│   │   └── ProjectionChart.jsx        # Line chart visualization of projections
│   ├── layout.js                      # Layout and head configuration
│   └── page.jsx                       # Main page of the application
├── public/                            # Public assets
│   └── favicon.ico                    # Favicon for the application
├── .gitignore                         # Files and directories to ignore in Git
├── package.json                       # Project dependencies and scripts
└── README.md                          # Project documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, please reach out at [adarsharma56763@gmail.com](mailto:adarsharma56763@gmail.com).
