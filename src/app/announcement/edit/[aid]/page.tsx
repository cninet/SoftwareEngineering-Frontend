import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { redirect } from "next/navigation";
import EditAnnouncementPanel from "@/components/EditAnnouncementPanel";
import getAnnouncement from "@/libs/getAnnouncement"; // Using your existing lib

export default async function EditAnnouncementPage({ params }: { params: { aid: string } }) {
    const { aid } = await params;
    const session = await getServerSession(authOptions);
    const token = session?.user.token;
    const isAdmin = session?.user.role === 'admin';

    if (!isAdmin) redirect('/announcement');

    // Fetch the specific announcement data to pre-fill the form
    const announcementDetail = await getAnnouncement(params.aid);

    return (
        <Suspense fallback={<Loading />}>
            <main className="min-h-screen bg-[#838383] flex flex-col">
                <EditAnnouncementPanel 
                    token={token!} 
                    aid={params.aid} 
                    initialData={announcementDetail.data} 
                />
            </main>
        </Suspense>
    );
}