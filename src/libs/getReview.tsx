'use server'

import { notFound } from "next/navigation";

export default async function getReview(id: string): Promise<ReviewJsonSingle> {
	const respond = await fetch(`${process.env.BACKEND_URL}/api/reviews/${id}`, {
		next: { tags: ['reviews', `review-${id}`], revalidate: 3600 }
	})

	if (respond.status === 404) {
		notFound();
	}

	if (!respond.ok) {
		const errText = await respond.text()
		throw new Error(`Failed to get review: ${respond.status} - ${errText}`)
	}

	return await respond.json()
}