"use client"

import { useState, useEffect } from "react"
import { Users, Eye, TrendingUp, Sparkles } from "lucide-react"

export function BudgetEstimator() {
  const [budget, setBudget] = useState(5000)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Simple logic for estimation
  const estReach = (budget * 42).toLocaleString() // roughly 42 views per dollar
  const estCreators = Math.floor(budget / 150) // roughly $150 per creator/collab avg
  const estEngagement = ((budget * 42) * 0.045).toLocaleString() // 4.5% engagement rate

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value))
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 p-1 rounded-3xl bg-gradient-to-r from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-[1.4rem] p-8 border border-white/50 dark:border-white/10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Controls */}
          <div className="space-y-8 text-left">
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#8B1538]">
                 <TrendingUp className="w-5 h-5" />
                 <span className="font-bold text-sm tracking-widest uppercase">Estimator</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                What's your budget?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                See the potential impact of your campaign instantly.
              </p>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-end">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Monthly Spend</label>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    ${budget.toLocaleString()}
                  </span>
               </div>
               
               <input 
                  type="range" 
                  min="1000" 
                  max="50000" 
                  step="500" 
                  value={budget}
                  onChange={handleSliderChange}
                  className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#8B1538] hover:accent-[#A91D47] transition-all"
               />
               <div className="flex justify-between text-xs text-gray-400 font-medium">
                  <span>$1k</span>
                  <span>$50k+</span>
               </div>
            </div>
          </div>

          {/* Right: Results Cards */}
          <div className="grid grid-cols-2 gap-4">
             {/* Card 1: Reach */}
             <div className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-lg flex flex-col justify-between aspect-square">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                   <Eye className="w-5 h-5" />
                </div>
                <div>
                   <div className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {estReach}
                   </div>
                   <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-left">
                      Est. Views
                   </div>
                </div>
             </div>

             {/* Card 2: Creators */}
             <div className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-lg flex flex-col justify-between aspect-square">
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
                   <Users className="w-5 h-5" />
                </div>
                <div>
                   <div className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {estCreators}+
                   </div>
                   <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-left">
                     Active Creators
                   </div>
                </div>
             </div>
             
             {/* Card 3: Engagement (Wide) */}
             <div className="col-span-2 p-5 rounded-2xl bg-[#8B1538] text-white shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Sparkles className="w-5 h-5" />
                   </div>
                   <div className="text-left">
                      <div className="text-xs text-white/80 font-medium uppercase tracking-wider">Est. Likes & Comments</div>
                      <div className="text-2xl font-bold">{estEngagement}</div>
                   </div>
                </div>
             </div>

          </div>

        </div>
      </div>
    </div>
  )
}
