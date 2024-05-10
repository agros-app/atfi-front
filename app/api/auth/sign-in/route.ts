import { doc, getDoc, setDoc } from "firebase/firestore";
import { usersCollection } from "@/lib/firestore"

export async function POST(request: Request) {
    const { uid, displayName, email, photoURL } = await request.json()
    try {
        const userDocRef = doc(usersCollection, uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
            // If user does not exist, create it
            await setDoc(userDocRef, {
                uid,
                displayName,
                email,
                photoURL
            });
        }

        return Response.json({ success: true, data: "Signed in successfully." }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, data: error }, { status: 500 });
    }
}