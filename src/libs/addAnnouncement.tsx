'use server'
import { revalidateTag } from 'next/cache'

export default async function addAnnouncement(
    name: string, 
    description: string, 
    logoURL: string, 
    bannerURL: string, 
    token: string
) {
    const respond = await fetch(`${process.env.BACKEND_URL}/api/announcements`, {
        method: "POST",
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
        body: JSON.stringify({ 
            name: name, 
            description: description, 
            logoURL: logoURL, // หากใช้ Google Drive: 'https://drive.google.com/uc?id=' + logoURL
            bannerURL: bannerURL 
        })
    })

    if (!respond.ok) {
        const errText = await respond.text()
        throw new Error(`Failed to add announcement: ${respond.status} - ${errText}`)
    }

    revalidateTag('announcements')
    return await respond.json()
} 