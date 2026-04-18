"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { revalidateAnnouncement } from "@/libs/revalidate";

export default function EditAnnouncementPanel({ token, aid, initialData }: { token: string, aid: string, initialData: any }) {
    const router = useRouter();

    // Initialize state with existing data
    const [title, setTitle] = useState(initialData.title);
    const [description, setDescription] = useState(initialData.description);
    const [logoURL, setLogoURL] = useState(initialData.logoURL);
    const [bannerURL, setBannerURL] = useState(initialData.bannerURL);

    const handleUpdate = async () => {
        // 1. Trigger the browser's confirmation popup
        const isConfirmed = window.confirm("Are you sure you want to update this announcement?");

        // 2. If the user clicks "Cancel", stop the function right here
        if (!isConfirmed) return;

        try {
            // ✅ ฝั่ง Client มองเห็น NEXT_PUBLIC_BACKEND_URL แน่นอน
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/announcements/${aid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    logoURL,
                    bannerURL,
                    isEdited: true, // 📌 เพิ่มบรรทัดนี้ เพื่อบอก Database ว่า "ฉันถูกแก้ไขแล้วนะ!"
                }),
            });

            if (response.ok) {
                // 1. Tell Next.js to throw away the old cached data
                await revalidateAnnouncement(aid); 
                
                // 2. Now redirect
                router.push("/announcement/manage");
                router.refresh(); 
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (err) {
            alert("Failed to update announcement");
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl mx-auto my-10 w-full">
            <h1 className="text-3xl font-bold text-center mb-8">Edit Announcement</h1>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-500 text-sm">Title *</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                <div>
                    <label className="block text-gray-500 text-sm">Description *</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5}
                        className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                <div>
                    <label className="block text-gray-500 text-sm">Logo Image ID (NOT URL) *</label>
                    <input type="text" value={logoURL} onChange={(e) => setLogoURL(e.target.value)}
                        className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                <div>
                    <label className="block text-gray-500 text-sm">Banner Image ID (NOT URL) *</label>
                    <input type="text" value={bannerURL} onChange={(e) => setBannerURL(e.target.value)}
                        className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                <div className="flex gap-4 mt-8">
                    <button onClick={() => router.back()} className="flex-1 bg-black text-white py-3 rounded-full font-bold">
                        Cancel
                    </button>
                    <button onClick={handleUpdate} className="flex-1 bg-blue-500 text-white py-3 rounded-full font-bold">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}