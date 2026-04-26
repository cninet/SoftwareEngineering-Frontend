'use server'
import { revalidateTag } from 'next/cache'

export default async function updateReview(
    rid:string,
    rating: number, 
    title: string, 
    comment: string, 
    token: string,
) {
    const respond = await fetch(`${process.env.BACKEND_URL}/api/reviews/${rid}`, {
      method: "PUT",
      headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
        body: JSON.stringify({ 
            title: title, 
            rating: rating, 
            comment: comment,
        })
    })

    if (!respond.ok) {
        const errText = await respond.text()
        throw new Error(`Failed to update review: ${respond.status} - ${errText}`)
    }

    revalidateTag('reviews')
    revalidateTag(`review-${rid}`)
    revalidateTag('dentists')
    return await respond.json()
}