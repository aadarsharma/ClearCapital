"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FinancialForm from '../components/FinancialForm'
import ResultsTable from '../components/ResultsTable'
import ProjectionChart from '../components/ProjectionChart'

interface ProjectionData {
  principal: number
  appreciationRates: number[]
  cagr: number
  inflationRates: number[]
  withdrawal: number
  years: number
  monthlyContribution: number
  stepUpRate: number
}

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

  const calculateProjections = ({ principal, appreciationRates, cagr, inflationRates, withdrawal, years, monthlyContribution, stepUpRate }: ProjectionData) => {
    const data: YearlyResult[] = []
    let realEstateValue = principal
    let mutualFundValue = principal
    let annualContribution = monthlyContribution * 12

    // Start with Year 0 initial values
    data.push({
      year: 0,
      principal,
      realEstateValueWithAppreciation: principal,
      mutualFundValueAfterCAGR: principal,
      inflationAdjustedAnnualWithdrawal: 0,
      mutualFundValueAfterWithdrawal: principal,
      inflationAdjustedMutualFundValueAfterWithdrawal: principal,
    })

    // Calculations for each subsequent year
    for (let year = 1; year <= years; year++) {
      const appreciationRate = appreciationRates[year - 1] ?? appreciationRates[appreciationRates.length - 1]
      const inflationRate = inflationRates[year - 1] ?? inflationRates[inflationRates.length - 1]

      // Increase annual contribution by step-up rate for each year after Year 1
      if (year > 1) {
        annualContribution *= (1 + stepUpRate / 100)
      }

      // Real Estate calculations
      realEstateValue = (realEstateValue * (1 + appreciationRate / 100)) + annualContribution

      // Mutual Fund calculations
      mutualFundValue = (mutualFundValue * (1 + cagr / 100)) + annualContribution
      const inflationAdjustedAnnualWithdrawal = withdrawal * Math.pow(1 + inflationRate / 100, year)
      const mutualFundValueAfterWithdrawal = Math.max(0, mutualFundValue - inflationAdjustedAnnualWithdrawal)
      const inflationAdjustedMutualFundValueAfterWithdrawal = mutualFundValueAfterWithdrawal / Math.pow(1 + inflationRate / 100, year)

      data.push({
        year,
        principal,
        realEstateValueWithAppreciation: realEstateValue,
        mutualFundValueAfterCAGR: mutualFundValue,
        inflationAdjustedAnnualWithdrawal,
        mutualFundValueAfterWithdrawal,
        inflationAdjustedMutualFundValueAfterWithdrawal,
      })

      // Update mutual fund value for the next year
      mutualFundValue = mutualFundValueAfterWithdrawal
    }

    setResults(data)
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">ClearCapital</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-primary/10">
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
