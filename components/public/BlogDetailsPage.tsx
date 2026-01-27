"use client"

import { useCMS } from "@/components/cms/CMSProvider"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BlogDetailsPageProps {
    slug: string
}

export function BlogDetailsPage({ slug }: BlogDetailsPageProps) {
    const config = useCMS()
    const router = useRouter()

    // Find post by slug or ID
    const post = config?.blogPosts?.find((p: any) => 
        p.slug === slug || p.id === slug || p.title?.toLowerCase().replace(/ /g, '-') === slug
    )

    if (!post) {
        return (
             <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <p className="text-gray-600 mb-8">The blog post you are looking for does not exist.</p>
                    <Link href="/blog" className="px-6 py-3 bg-[#8B1538] text-white rounded-full">
                        Back to Blog
                    </Link>
                </div>
                <Footer />
             </div>
        )
    }

    const isUrl = post.coverImage?.startsWith("http") || post.coverImage?.startsWith("data:")

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans">
            <Navbar />
            
            <article className="pt-32 pb-20">
                {/* Header */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                     <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#8B1538] mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                    
                    <div className="flex items-center justify-center gap-4 mb-6">
                        {post.tags?.map((tag: string) => (
                             <span key={tag} className="px-3 py-1 bg-[#8B1538]/10 text-[#8B1538] rounded-full text-xs font-semibold uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                         <div className="flex items-center gap-2">
                             <User className="w-4 h-4" />
                             {post.author}
                         </div>
                         <div className="flex items-center gap-2">
                             <Calendar className="w-4 h-4" />
                             {new Date(post.publishedAt).toLocaleDateString()}
                         </div>
                         <div className="flex items-center gap-2">
                             <Clock className="w-4 h-4" />
                             5 min read
                         </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl relative bg-gray-100">
                         {isUrl ? (
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white text-9xl font-bold opacity-10">
                                {post.title.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div 
                        className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-[#8B1538] hover:prose-a:text-[#A91D47] prose-img:rounded-xl max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share & Tags Footer */}
                    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex flex-wrap gap-2">
                            {post.tags?.map((tag: string) => (
                                <span key={tag} className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-[#8B1538] transition-colors">
                            <Share2 className="w-4 h-4" /> Share this post
                        </button>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    )
}
