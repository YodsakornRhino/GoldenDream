"use client"

import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ChatWidget from "@/components/chat-widget"
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function MortgageCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(400000)
  const [downPayment, setDownPayment] = useState(80000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(30)

  const calculateMonthlyPayment = () => {
    const principal = loanAmount - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    if (monthlyRate === 0) {
      return principal / numberOfPayments
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return monthlyPayment
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalPayment = monthlyPayment * loanTerm * 12
  const totalInterest = totalPayment - (loanAmount - downPayment)

  return (
    <div className={`${inter.className} bg-gray-50 min-h-screen`}>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mortgage Calculator</h1>
            <p className="text-xl opacity-90">
              Calculate your monthly mortgage payments and explore different scenarios
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2" />
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Home Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Down Payment</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  <div className="mt-2">
                    <Slider
                      value={[downPayment]}
                      onValueChange={(value) => setDownPayment(value[0])}
                      max={loanAmount * 0.5}
                      min={0}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>$0</span>
                      <span>{((downPayment / loanAmount) * 100).toFixed(1)}%</span>
                      <span>${(loanAmount * 0.5).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-3 text-gray-400" size={20} />
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  <div className="mt-2">
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      max={10}
                      min={3}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>3%</span>
                      <span>{interestRate}%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Loan Term (Years)</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  <div className="mt-2">
                    <Slider
                      value={[loanTerm]}
                      onValueChange={(value) => setLoanTerm(value[0])}
                      max={30}
                      min={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>10 years</span>
                      <span>{loanTerm} years</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Payment Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      ${monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-gray-600">Monthly Payment</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Principal & Interest</span>
                      <span className="font-semibold">
                        ${monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Property Tax (est.)</span>
                      <span>${((loanAmount * 0.012) / 12).toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Home Insurance (est.)</span>
                      <span>${((loanAmount * 0.003) / 12).toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>PMI (if applicable)</span>
                      <span>
                        $
                        {downPayment < loanAmount * 0.2
                          ? ((loanAmount * 0.005) / 12).toLocaleString("en-US", { maximumFractionDigits: 0 })
                          : "0"}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Monthly Payment</span>
                      <span>
                        $
                        {(
                          monthlyPayment +
                          (loanAmount * 0.012) / 12 +
                          (loanAmount * 0.003) / 12 +
                          (downPayment < loanAmount * 0.2 ? (loanAmount * 0.005) / 12 : 0)
                        ).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Loan Amount</span>
                    <span className="font-semibold">${(loanAmount - downPayment).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest Paid</span>
                    <span className="font-semibold">
                      ${totalInterest.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount Paid</span>
                    <span className="font-semibold">
                      ${totalPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full" size="lg">
                Get Pre-Approved
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mortgage Tips</h2>
            <p className="text-gray-600">Important factors to consider when getting a mortgage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Down Payment</h3>
              <p className="text-gray-600">
                A larger down payment reduces your monthly payment and may eliminate PMI requirements.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Credit Score</h3>
              <p className="text-gray-600">
                Higher credit scores typically qualify for better interest rates and loan terms.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Debt-to-Income</h3>
              <p className="text-gray-600">Lenders prefer a debt-to-income ratio below 43% for mortgage approval.</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Loan Term</h3>
              <p className="text-gray-600">
                Shorter terms mean higher monthly payments but less interest paid overall.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Interest Rates</h3>
              <p className="text-gray-600">
                Even small rate differences can significantly impact your total payment amount.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Additional Costs</h3>
              <p className="text-gray-600">Remember to budget for property taxes, insurance, and maintenance costs.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  )
}
