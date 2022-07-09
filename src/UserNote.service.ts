import {User} from "firebase/auth";
import axios from "axios";


const UserNoteService = {
    uploadNote: async (user: User | null, userNote: any) => {
        if (!user)
            throw new Error('User not authenticated!');

        const {uid: userId, email: userEmail, displayName: userDisplayName} = user;
        const data = {...userNote, userEmail, userId, userDisplayName};
        return await axios.post('http://localhost:5000/notes/upload', data)
    }
}

export default UserNoteService;
