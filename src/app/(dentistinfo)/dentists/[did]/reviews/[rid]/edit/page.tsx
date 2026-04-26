import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Loading from "@/components/Loading";
import getDentist from "@/libs/getDentist";
import getReview from "@/libs/getReview"; // Using your existing lib
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import DentistDetail from "@/components/DentistDetail";
import EditReviewForm from "@/components/EditReviewForm";
import { redirect } from "next/navigation";

export default async function EditReviewPage({ params }: { params: Promise<{ did: string, rid: string }> }) {
    const { did, rid } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session) redirect('/login');

    // Fetch dentist info and the specific review
    const dentist = await getDentist(did);
    const review = await getReview(rid); // Adjust based on your getReview return structure

    // Security: Redirect if user doesn't own the review and isn't admin
    // Note: Assuming your API returns user ID in review.data.user
    const reviewUserId = typeof review.data.user === 'object' 
        ? review.data.user._id 
        : review.data.user;

    if (session.user.role !== 'admin' && session.user.id !== reviewUserId) {
        redirect(`/dentists/${did}`);
    }

    return (
        <Suspense fallback={<Loading />}>
            <DentistDetail 
                dentistJsonReady={dentist} 
                did={did} 
                isAdmin={session.user.role === 'admin'} 
                hasBooking={false} 
                token={session.user.token} 
                isEditView={true}
            />
            
            <div className="max-w-4xl mx-auto p-4">
                <EditReviewForm 
                    initialData={review.data} 
                    token={session.user.token} 
                    did={did} 
                    rid={rid} 
                />
            </div>
        </Suspense>
    );
}