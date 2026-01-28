"use client"

import { useState } from "react"
import { toast } from "sonner"

export function useContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    service: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({...prev, service}))
  }

  const handleBudgetChange = (budget: string) => {
    setFormData(prev => ({...prev, budget}))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate delay for "super" feeling
    await new Promise(r => setTimeout(r, 1500))

    try {
      toast.success("Message sent! We'll be in touch instantly.")
      setFormData({ name: "", email: "", countryCode: "+91", mobile: "", service: "", budget: "", message: "" })
    } catch (e) {
      toast.error("Something went wrong.")
    }
    setIsSubmitting(false)
  }

  return {
    formData,
    isSubmitting,
    handleChange,
    handleServiceChange,
    handleBudgetChange,
    handleSubmit
  }
}
