import { Metadata } from "next"

interface SchemaMarkup {
  "@context": string
  "@type": string
  [key: string]: any
}

export function generateOrganizationSchema(): SchemaMarkup {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TheNextChoose",
    "url": "https://thenextchoose.com",
    "logo": "https://thenextchoose.com/logo/thenextchooselogo.png",
    "description": "8 cutting-edge digital services: Influencer Marketing, Video Editing, AI Automation, Website Building, and 3D Services",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Innovation Street",
      "addressLocality": "Tech City",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-234-567-890",
      "contactType": "customer service",
      "email": "info@thenextchoose.com",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://facebook.com/thenextchoose",
      "https://twitter.com/thenextchoose",
      "https://instagram.com/thenextchoose",
      "https://linkedin.com/company/thenextchoose",
      "https://youtube.com/@thenextchoose"
    ]
  }
}

export function generateServiceSchema(serviceName: string, description: string): SchemaMarkup {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "Organization",
      "name": "TheNextChoose",
      "url": "https://thenextchoose.com"
    },
    "description": description,
    "areaServed": "Worldwide"
  }
}

export function generateAggregateRatingSchema(ratingValue: number, reviewCount: number): SchemaMarkup {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": ratingValue.toString(),
    "reviewCount": reviewCount.toString(),
    "bestRating": "5",
    "worstRating": "1"
  }
}

export function generateReviewSchema(reviews: Array<{name: string, rating: number, text: string, date: string}>): SchemaMarkup[] {
  return reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "5"
    },
    "reviewBody": review.text,
    "datePublished": review.date
  }))
}

export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>): SchemaMarkup {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function generateFAQSchema(faqs: Array<{question: string, answer: string}>): SchemaMarkup {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export function SchemaScript({ schema }: { schema: SchemaMarkup | SchemaMarkup[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(schema) ? schema : schema)
      }}
    />
  )
}
