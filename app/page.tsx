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

  const calculateProjections = ({ principal = 0, appreciationRates = [], cagr = 0, inflationRates = [], withdrawal = 0, years, monthlyContribution = 0, stepUpRate = 0 }) => {
    const data = [];
    let realEstateValue = principal;
    let mutualFundValue = principal;
    let annualStepUpMultiplier = 1 + stepUpRate / 100; // Factor to adjust monthly contribution annually
    let monthlyCAGR = Math.pow(1 + cagr / 100, 1 / 12) - 1; // Convert CAGR to monthly rate for compounding
  
    // Year 0 initial values
    data.push({
      year: 0,
      principal,
      realEstateValueWithAppreciation: principal,
      mutualFundValueAfterCAGR: principal,
      inflationAdjustedAnnualWithdrawal: 0,
      mutualFundValueAfterWithdrawal: principal,
      inflationAdjustedMutualFundValueAfterWithdrawal: principal,
    });
  
    // Loop over each year to calculate projections
    for (let year = 1; year <= years; year++) {
      const appreciationRate = appreciationRates[year - 1] ?? 0; // Default to 0% if appreciation rate not provided
      const inflationRate = inflationRates[year - 1] ?? 0; // Default to 0% if inflation rate not provided
      let totalYearlyContribution = 0;
  
      // Apply the step-up rate to monthly contribution at the beginning of each year (if year > 1)
      if (year > 1) {
        monthlyContribution *= annualStepUpMultiplier;
      }
  
      // Monthly compounding for mutual fund and accumulating total yearly contribution
      for (let month = 1; month <= 12; month++) {
        mutualFundValue = (mutualFundValue * (1 + monthlyCAGR)) + monthlyContribution;
        totalYearlyContribution += monthlyContribution;
      }
  
      // End-of-year update for real estate: add total contributions and apply annual appreciation
      realEstateValue = (realEstateValue + totalYearlyContribution) * (1 + appreciationRate / 100);
  
      // Adjust the annual withdrawal for inflation
      const inflationAdjustedAnnualWithdrawal = withdrawal * Math.pow(1 + inflationRate / 100, year);
      const mutualFundValueAfterWithdrawal = Math.max(0, mutualFundValue - inflationAdjustedAnnualWithdrawal);
      const inflationAdjustedMutualFundValueAfterWithdrawal = mutualFundValueAfterWithdrawal / Math.pow(1 + inflationRate / 100, year);
  
      data.push({
        year,
        principal,
        realEstateValueWithAppreciation: realEstateValue,
        mutualFundValueAfterCAGR: mutualFundValue,
        inflationAdjustedAnnualWithdrawal,
        mutualFundValueAfterWithdrawal,
        inflationAdjustedMutualFundValueAfterWithdrawal,
      });
  
      // Update mutual fund value for the next year’s starting value
      mutualFundValue = mutualFundValueAfterWithdrawal;
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
