"use client"

import { useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage, Environment, ContactShadows } from "@react-three/drei"
import { DonutModel } from "./DonutModel"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCw } from "lucide-react"

export function DonutConfigurator() {
  const [bodyColor, setBodyColor] = useState("#8B1538") // Brand Maroon default
  const [frontColor, setFrontColor] = useState("#fbbf24") // Amber/Yellow default
  const [animation, setAnimation] = useState<"Walk" | "Idle">("Walk")
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="w-full py-20 bg-gray-50 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
        
        {/* Left: Canvas Area */}
        <div className="lg:col-span-2 h-[500px] lg:h-[600px] bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase text-gray-500 border border-gray-100">
                Interactive 3D
            </div>

            <Canvas 
              shadows 
              dpr={[1, 2]} 
              camera={{ position: [0, 0, 4], fov: 50 }}
              performance={{ min: 0.5 }}
            >
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6} shadows={{ type: 'contact', opacity: 0.4, blur: 2 }}>
                        <DonutModel 
                            bodyColor={bodyColor} 
                            frontColor={frontColor} 
                            animation={animation}
                        />
                    </Stage>
                    <OrbitControls autoRotate={autoRotate} autoRotateSpeed={4} enableZoom={false} makeDefault />
                </Suspense>
            </Canvas>
        </div>

        {/* Right: Controls */}
        <div className="flex flex-col justify-center space-y-8 bg-white p-8 rounded-3xl border border-gray-200 shadow-lg h-fit">
            <div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Configure Your Model</h3>
                <p className="text-sm text-gray-500">Customise colors and view animations in real-time.</p>
            </div>

            {/* Color Controls */}
            <div className="space-y-6">
                <div className="space-y-3">
                    <Label className="text-gray-900 font-bold">Body Color</Label>
                    <div className="flex gap-2 flex-wrap">
                        {['#8B1538', '#1e293b', '#2563eb', '#16a34a', '#db2777'].map((c) => (
                            <button
                                key={c}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${bodyColor === c ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setBodyColor(c)}
                            />
                        ))}
                        <input 
                            type="color" 
                            value={bodyColor}
                            onChange={(e) => setBodyColor(e.target.value)}
                            className="w-8 h-8 rounded-full overflow-hidden border-0 p-0 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-gray-900 font-bold">Front Color (Icing)</Label>
                    <div className="flex gap-2 flex-wrap">
                        {['#fbbf24', '#ffffff', '#ef4444', '#8B1538', '#000000'].map((c) => (
                            <button
                                key={c}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${frontColor === c ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setFrontColor(c)}
                            />
                        ))}
                         <input 
                            type="color" 
                            value={frontColor}
                            onChange={(e) => setFrontColor(e.target.value)}
                            className="w-8 h-8 rounded-full overflow-hidden border-0 p-0 cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Animation Controls */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
                <Label className="text-gray-900 font-bold">Animation Mode</Label>
                <div className="flex gap-2">
                    <Button 
                        variant={animation === "Walk" ? "default" : "outline"}
                        className={animation === "Walk" ? "bg-[#8B1538] hover:bg-[#6b102b]" : ""}
                        onClick={() => setAnimation("Walk")}
                    >
                        <Play className="w-4 h-4 mr-2" /> Walk
                    </Button>
                    <Button 
                        variant={animation === "Idle" ? "default" : "outline"}
                        className={animation === "Idle" ? "bg-[#8B1538] hover:bg-[#6b102b]" : ""}
                        onClick={() => setAnimation("Idle")}
                    >
                        <Pause className="w-4 h-4 mr-2" /> Idle
                    </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">Auto-Rotate</span>
                    <Button
                        size="sm"
                        variant={autoRotate ? "default" : "secondary"}
                        onClick={() => setAutoRotate(!autoRotate)}
                        className={autoRotate ? "bg-black text-white" : "bg-gray-200 text-gray-600"}
                    >
                        <RotateCw className={`w-4 h-4 mr-2 ${autoRotate ? 'animate-spin' : ''}`} />
                        {autoRotate ? "On" : "Off"}
                    </Button>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}
