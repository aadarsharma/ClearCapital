import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  export default function ResultsTable({ results }) {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Year</TableHead>
              <TableHead>Real Estate Value</TableHead>
              <TableHead>Inflation-Adjusted Real Estate Yield</TableHead>
              <TableHead>Mutual Fund Value</TableHead>
              <TableHead>Inflation-Adjusted Mutual Fund Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map(({ year, realEstateValue, inflationAdjustedRealEstateYield, mutualFundValue, inflationAdjustedMutualFundValue }) => (
              <TableRow key={year}>
                <TableCell className="font-medium">{year}</TableCell>
                <TableCell>₹{realEstateValue.toFixed(2)}</TableCell>
                <TableCell>₹{inflationAdjustedRealEstateYield.toFixed(2)}</TableCell>
                <TableCell>₹{mutualFundValue.toFixed(2)}</TableCell>
                <TableCell>₹{inflationAdjustedMutualFundValue.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }