"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { User, Mail, Phone, Save, ArrowLeft, Camera, Lock, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"

export function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatarFile: null as File | null,
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/login')
    } else if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }))
      if (session.user.image) {
        setAvatarPreview(session.user.image)
      }
    }
  }, [session, status, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }
      
      setFormData(prev => ({...prev, avatarFile: file}))
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      // Validate passwords if changing
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error("New passwords do not match")
          setIsSaving(false)
          return
        }
        if (formData.newPassword.length < 6) {
          toast.error("Password must be at least 6 characters")
          setIsSaving(false)
          return
        }
      }

      // Create FormData for file upload
      const updateData = new FormData()
      updateData.append('name', formData.name)
      updateData.append('email', formData.email)
      updateData.append('countryCode', formData.countryCode)
      updateData.append('mobile', formData.mobile)
      if (formData.newPassword) {
        updateData.append('currentPassword', formData.currentPassword)
        updateData.append('newPassword', formData.newPassword)
      }
      if (formData.avatarFile) {
        updateData.append('avatar', formData.avatarFile)
      }

      const res = await fetch('/api/profile/update', {
        method: 'POST',
        body: updateData,
      })

      if (res.ok) {
        toast.success("Profile updated successfully!")
        setIsEditing(false)
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }))
        // Update session
        await update()
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to update profile")
      }
    } catch (error) {
      toast.error("Failed to update profile")
    }
    
    setIsSaving(false)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#8B1538] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#8B1538] dark:hover:text-[#A91D47] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Profile Header */}
          <div className="glass-strong rounded-3xl p-8 border border-white/20 mb-8">
            <div className="flex items-center gap-6">
              {/* Avatar with Upload */}
              <div className="relative group">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover shadow-xl"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white font-bold text-4xl flex items-center justify-center shadow-xl">
                    {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {session?.user?.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {session?.user?.email}
                </p>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-3 text-sm text-[#8B1538] dark:text-[#A91D47] hover:underline font-medium"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="glass-strong rounded-3xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Personal Information
            </h2>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8B1538] focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8B1538] focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-32 px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8B1538] focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      disabled={!isEditing}
                      pattern="[0-9]{10}"
                      maxLength={10}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8B1538] focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Password Change Section - Only when editing */}
              {isEditing && (
                <>
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Change Password (Optional)
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8B1538] focus:border-transparent"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8B1538] focus:border-transparent"
                        placeholder="Enter new password"
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#8B1538] focus:border-transparent"
                        placeholder="Confirm new password"
                        minLength={6}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Save Button */}
              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full py-3 bg-gradient-to-r from-[#8B1538] to-[#A91D47] text-white rounded-lg font-semibold transition-smooth hover:shadow-xl hover:shadow-[#8B1538]/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Account Info */}
          <div className="glass-strong rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Account Type</span>
                <span className="font-medium text-gray-900 dark:text-white">Public User</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Login Method</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {session?.user?.email?.includes('@phone.') ? 'Phone' : 'Email/Google'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
