import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface YearlyResult {
  year: number
  principal: number
  realEstateValueWithAppreciation: number
  mutualFundValueAfterCAGR: number
  inflationAdjustedAnnualWithdrawal: number
  mutualFundValueAfterWithdrawal: number
  inflationAdjustedMutualFundValueAfterWithdrawal: number
}

interface ResultsTableProps {
  results: YearlyResult[]
}

export default function ResultsTable({ results }: ResultsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Principal (₹)</TableHead>
            <TableHead>Real Estate Value (With Appreciation) (₹)</TableHead>
            <TableHead>Mutual Fund Value (After CAGR) (₹)</TableHead>
            <TableHead>Annual Withdrawal (Inflation-Adjusted) (₹)</TableHead>
            <TableHead>Mutual Fund Value After Withdrawal (₹)</TableHead>
            <TableHead>Inflation-Adjusted Mutual Fund Value After Withdrawal (₹)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((row) => (
            <TableRow key={row.year}>
              <TableCell>{row.year}</TableCell>
              <TableCell>₹{(row.principal ?? 0).toLocaleString()}</TableCell>
              <TableCell>₹{(row.realEstateValueWithAppreciation ?? 0).toLocaleString()}</TableCell>
              <TableCell>₹{(row.mutualFundValueAfterCAGR ?? 0).toLocaleString()}</TableCell>
              <TableCell>₹{(row.inflationAdjustedAnnualWithdrawal ?? 0).toLocaleString()}</TableCell>
              <TableCell>₹{(row.mutualFundValueAfterWithdrawal ?? 0).toLocaleString()}</TableCell>
              <TableCell>₹{(row.inflationAdjustedMutualFundValueAfterWithdrawal ?? 0).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
