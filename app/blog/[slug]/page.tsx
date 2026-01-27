import { BlogDetailsPage } from "@/components/public/BlogDetailsPage"

export const runtime = 'edge'

export default async function Page({ params }: { params: { slug: string } }) {
    const slug = (await params).slug
    return <BlogDetailsPage slug={slug} />
}
