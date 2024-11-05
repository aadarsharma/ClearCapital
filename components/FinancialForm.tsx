"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FinancialForm({ onSubmit }) {
  const [principal, setPrincipal] = useState('')
  const [appreciationRates, setAppreciationRates] = useState('')
  const [cagr, setCAGR] = useState('')
  const [inflationRates, setInflationRates] = useState('')
  const [withdrawal, setWithdrawal] = useState('')
  const [years, setYears] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validate principal as a positive number
    if (!principal || parseFloat(principal) <= 0) {
      alert("Please enter a valid principal amount greater than zero.");
      return;
    }
  
    // Parse appreciation and inflation rates with defaults if empty
    const appreciationArray = appreciationRates
      ? appreciationRates.split(',').map((rate) => parseFloat(rate.trim()) || 0)
      : Array.from({ length: parseInt(years) || 1 }, () => 2); // Default 2% appreciation
  
    const inflationArray = inflationRates
      ? inflationRates.split(',').map((rate) => parseFloat(rate.trim()) || 0)
      : Array.from({ length: parseInt(years) || 1 }, () => 7); // Default 7% inflation
  
    onSubmit({
      principal: parseFloat(principal) || 0,
      appreciationRates: appreciationArray,
      cagr: parseFloat(cagr) || 0,
      inflationRates: inflationArray,
      withdrawal: parseFloat(withdrawal) || 0,
      years: parseInt(years) || 0,
    });
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="principal" className="text-sm font-medium">Principal (₹)</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full"
            placeholder="Enter principal amount"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="appreciationRates" className="text-sm font-medium">Real Estate Appreciation Rates (%)</Label>
          <Input
            id="appreciationRates"
            type="text"
            value={appreciationRates}
            onChange={(e) => setAppreciationRates(e.target.value)}
            className="w-full"
            placeholder="e.g., 2, 2.5, 3, ..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cagr" className="text-sm font-medium">Mutual Fund CAGR (%)</Label>
          <Input
            id="cagr"
            type="number"
            value={cagr}
            onChange={(e) => setCAGR(e.target.value)}
            className="w-full"
            placeholder="Enter CAGR"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inflationRates" className="text-sm font-medium">General Inflation Rates (%)</Label>
          <Input
            id="inflationRates"
            type="text"
            value={inflationRates}
            onChange={(e) => setInflationRates(e.target.value)}
            className="w-full"
            placeholder="e.g., 7, 6.5, 7.2, ..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="withdrawal" className="text-sm font-medium">Annual Withdrawal (₹)</Label>
          <Input
            id="withdrawal"
            type="number"
            value={withdrawal}
            onChange={(e) => setWithdrawal(e.target.value)}
            className="w-full"
            placeholder="Enter annual withdrawal"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="years" className="text-sm font-medium">Investment Duration (years)</Label>
          <Input
            id="years"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full"
            placeholder="Enter investment duration"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">Calculate</Button>
    </form>
  )
}