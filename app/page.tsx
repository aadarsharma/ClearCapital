"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FinancialForm from '../components/FinancialForm'
import ResultsTable from '../components/ResultsTable'
import ProjectionChart from '../components/ProjectionChart'

interface YearlyResult {
  year: number
  principal: number
  realEstateValueWithAppreciation: number
  mutualFundValueAfterCAGR: number
  inflationAdjustedAnnualWithdrawal: number
  mutualFundValueAfterWithdrawal: number
  inflationAdjustedMutualFundValueAfterWithdrawal: number
}

export default function Home() {
  const [results, setResults] = useState<YearlyResult[]>([])

  const calculateProjections = ({ principal, appreciationRates, cagr, inflationRates, withdrawal, years, monthlyContribution, stepUpRate }) => {
    const data = [];
    let realEstateValue = principal;
    let mutualFundValue = principal;
    let annualContribution = monthlyContribution * 12;
  
    // Projections for each year starting from Year 1, but pushed as Year 0
    for (let year = 1; year <= years + 1; year++) { // loop until `years + 1` for shifted values
      const appreciationRate = appreciationRates[year - 1] ?? appreciationRates[appreciationRates.length - 1];
      const inflationRate = inflationRates[year - 1] ?? inflationRates[inflationRates.length - 1];
  
      // Step-up annual contribution each year after Year 1
      if (year > 1) {
        annualContribution *= (1 + stepUpRate / 100);
      }
  
      // Update real estate and mutual fund values with appreciation and contributions
      realEstateValue = (realEstateValue * (1 + appreciationRate / 100)) + annualContribution;
      mutualFundValue = (mutualFundValue * (1 + cagr / 100)) + annualContribution;
  
      const inflationAdjustedAnnualWithdrawal = withdrawal * Math.pow(1 + inflationRate / 100, year);
      const mutualFundValueAfterWithdrawal = Math.max(0, mutualFundValue - inflationAdjustedAnnualWithdrawal);
      const inflationAdjustedMutualFundValueAfterWithdrawal = mutualFundValueAfterWithdrawal / Math.pow(1 + inflationRate / 100, year);
  
      // Push the current year's values as previous year's results
      data.push({
        year: year - 1,
        principal,
        realEstateValueWithAppreciation: realEstateValue,
        mutualFundValueAfterCAGR: mutualFundValue,
        inflationAdjustedAnnualWithdrawal,
        mutualFundValueAfterWithdrawal,
        inflationAdjustedMutualFundValueAfterWithdrawal,
      });
  
      mutualFundValue = mutualFundValueAfterWithdrawal;  // Update for next year's calculation
    }
  
    setResults(data);
  };  

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-semibold mb-6 text-center tracking-tight">ClearCapital</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gray-200">
          <CardTitle className="text-2xl">Investment Projection Calculator</CardTitle>
          <CardDescription>Compare real estate and mutual fund investments over time</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <FinancialForm onSubmit={calculateProjections} />
          {results.length > 0 && (
            <Tabs defaultValue="chart" className="mt-6">
              <TabsList className="w-full">
                <TabsTrigger value="chart" className="w-1/2">Chart</TabsTrigger>
                <TabsTrigger value="table" className="w-1/2">Table</TabsTrigger>
              </TabsList>
              <TabsContent value="chart" className="mt-4">
                <ProjectionChart results={results} />
              </TabsContent>
              <TabsContent value="table" className="mt-4">
                <ResultsTable results={results} />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
