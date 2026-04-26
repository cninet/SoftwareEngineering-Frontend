"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Rating } from "@mui/material"; // Assuming you use MUI stars based on previous screenshots

export default function EditReviewForm({ initialData, token, did, rid }: any) {
    const [title, setTitle] = useState(initialData.title);
    const [comment, setComment] = useState(initialData.comment);
    const [rating, setRating] = useState(initialData.rating);
    const router = useRouter();

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/${rid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, comment, rating })
            });

            if (response.ok) {
                router.push(`/dentists/${did}`);
                router.refresh();
            }
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    return (
        <div className="bg-white p-8 shadow-lg rounded-xl border border-gray-100 mt-[-20px] relative z-10 mx-auto max-w-2xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit your Feedback</h2>
            
            <input 
                className="w-full mb-4 p-3 border-b border-gray-200 outline-none text-lg focus:border-blue-500 transition-colors"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Review title..."
            />
            
            <textarea 
                className="w-full h-48 p-3 border rounded-lg outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Modify your comment..."
            />

            <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Rating:</span>
                    <Rating 
                        value={rating} 
                        onChange={(event, newValue) => setRating(newValue)} 
                    />
                </div>
                
                <div className="flex gap-3">
                    <button 
                        onClick={() => router.back()} 
                        className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleUpdate} 
                        className="px-8 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-shadow shadow-md cursor-pointer transition-all"
                    >
                        Update Review
                    </button>
                </div>
            </div>
        </div>
    );
}