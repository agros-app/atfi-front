import { doc, getDoc, setDoc } from "firebase/firestore";
import { usersCollection } from "@/lib/firestore"
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
    const user = await request.json()
    try {
        // const userDocRef = doc(usersCollection, user.uid);
        // const docSnap = await getDoc(userDocRef);

        // if (!docSnap.exists()) {
        //     // If user does not exist, create it
        //     await setDoc(userDocRef, {
        //         uid: user.uid,
        //         displayName: user.displayName,
        //         email: user.email,
        //         photoURL: user.photoURL
        //     });
        // }
        await createSession(user);

        return Response.json({ success: true, data: "Signed in successfully." }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, data: error }, { status: 500 });
    }
}