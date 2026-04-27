'use server'
import { revalidateTag } from 'next/cache'

export default async function addReview(
    dentistId: string,
    rating: number, 
    title: string, 
    comment: string, 
    token: string
) {
    const respond = await fetch(`${process.env.BACKEND_URL}/api/dentists/${dentistId}/reviews`, {
      method: "POST",
		  headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
        body: JSON.stringify({ 
            rating: rating,
            title: title, 
            comment: comment 
        })
    })

    if (!respond.ok) {
        const errText = await respond.text()
        throw new Error(`Failed to create review: ${respond.status} - ${errText}`)
    }

    revalidateTag('reviews')
    revalidateTag('dentists')
    return await respond.json()
}