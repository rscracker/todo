import { deflate } from "zlib";
import firebase_app from "../config";
import { collection, getFirestore, addDoc, getDoc, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebase_app)

async function addData(collectionId: any, data: any) {
    let result = null;
    let error = null;

    try {
        await addDoc(collection(db, collectionId), data,);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

interface todo {
    'date': any,
    'todo': string,
}

async function streamData(collectionId: any) {
    try {
        const result: todo[] = [];
        const unsubscribe = onSnapshot(collection(db, collectionId), (snapshot) => {
            const temp: todo[] = [];
            snapshot.forEach((doc) => {
                temp.push(doc.data() as todo);
            });
            result.push(...temp);
        });
        return { unsubscribe, result };
    } catch (error) {
        console.error(error);
        return { unsubscribe: () => { }, result: [] };
    }
}

const firestoreFunctions = {
    addData,
    streamData,
}

export default firestoreFunctions;