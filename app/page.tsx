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

export default function Home() {
  const [results, setResults] = useState<Array<any>>([])

  const calculateProjections = ({ principal, appreciationRates, cagr, inflationRates, withdrawal, years, monthlyContribution, stepUpRate }: ProjectionData) => {
    let data = []
    let realEstateValue = principal
    let mutualFundValue = principal
    let annualContribution = monthlyContribution * 12

    for (let year = 0; year <= years; year++) {
      const appreciationRate = appreciationRates[year] !== undefined 
        ? appreciationRates[year] 
        : appreciationRates[appreciationRates.length - 1]
        
      const inflationRate = inflationRates[year] !== undefined 
        ? inflationRates[year] 
        : inflationRates[inflationRates.length - 1]

      // Increase contribution by step-up rate each year
      if (year > 0) {
        annualContribution *= (1 + (stepUpRate / 100))
      }

      // Update values for real estate and mutual fund with monthly contributions and annual returns
      realEstateValue = (realEstateValue * (1 + (appreciationRate / 100))) + annualContribution
      const realEstateYield = realEstateValue * 0.04
      const inflationAdjustedRealEstateYield = realEstateYield / Math.pow(1 + (inflationRate / 100), year)

      mutualFundValue = (mutualFundValue * (1 + (cagr / 100))) + annualContribution - (withdrawal * Math.pow(1 + (inflationRate / 100), year))
      mutualFundValue = mutualFundValue < 0 ? 0 : mutualFundValue

      const inflationAdjustedMutualFundValue = mutualFundValue / Math.pow(1 + (inflationRate / 100), year)

      data.push({
        year,
        realEstateValue: realEstateValue < 0 ? 0 : realEstateValue,
        inflationAdjustedRealEstateYield,
        mutualFundValue,
        inflationAdjustedMutualFundValue,
      })
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
