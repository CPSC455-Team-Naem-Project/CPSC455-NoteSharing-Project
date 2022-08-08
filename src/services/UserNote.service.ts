import {getAuth} from "firebase/auth";
import axios from "axios";
import {FilePondFile} from "filepond";
import {initializeApp} from "firebase/app";
import firebaseConfig from './config';
import {UserNote, UserNoteAttributes, UserNoteFile} from "../models/UserNote";
const {getDownloadURL, getStorage, ref, uploadBytes} = require("firebase/storage");

initializeApp(firebaseConfig)


const storage = getStorage()
const auth = getAuth();

const BASE_URL = process.env.REACT_APP_PROD_URL ? process.env.REACT_APP_PROD_URL: process.env.REACT_APP_SERVER_URL
const concatUrl = (url: string) => `${BASE_URL}/${url}`

const UserNoteService = {
    // sends note to server for DB persistence
    saveNote: async (userNote: any): Promise<UserNote> => {
        const {userId, userEmail, userDisplayName} = UserNoteService.getUserCredentials();
        const data = {...userNote, userEmail, userId, userDisplayName};
        console.log("DATA IS", data)
        const postData = await axios.post<UserNote>(`${BASE_URL}/upload`, data)
        return postData.data;
    },

    uploadSingleFileToFirebase: async (file: any) => {
        const file_ = (file as FilePondFile).file;
        const storageRef = ref(storage, file_.name);
        const fileBuffer = await file_.arrayBuffer();
        const snapshot = await uploadBytes(storageRef, fileBuffer, {contentType: file_.type})
        const url = await getDownloadURL(snapshot.ref)
        return {
            snapshot,
            url
        }
    },

    uploadFiles: async (files: File[], userNoteData: UserNoteAttributes) => {
        const promises = [];
        const noteFiles: UserNoteFile[] = [];
        for (const file of files) {
            promises.push(UserNoteService.uploadSingleFileToFirebase(file))
        }

        const data = await Promise.all(promises)

        for (const d of data) {
            const {snapshot, url} = d;
            const {name: fileName, size, contentType} = snapshot.metadata;
            noteFiles.push({
                fileName,
                size,
                contentType,
                url
            })
        }

        return await UserNoteService.saveNote({
            ...userNoteData,
            files: noteFiles
        })
    },

    getUserCredentials: function () {
        if (!auth.currentUser)
            throw new Error('User not authenticated!');
        const {uid: userId, email: userEmail, displayName: userDisplayName} = auth.currentUser;
        return {userId, userEmail, userDisplayName};
    },

    getNoteById: async (noteId: string) => {
        const {userId} = UserNoteService.getUserCredentials();
        const url = concatUrl(`getByUserIdAndNoteId/${userId}/${noteId}`)
        const response = await axios.get<UserNote>(url)
        return response.data;
    },

    getUserIdByNoteId: async (noteId: string) => {
        const url = concatUrl(`getUserIdByNoteId/${noteId}`)
        const response = await axios.get(url)
        return response.data;
    },

    getMostRecentNotes: async () => {
        return await axios.get(`${BASE_URL}/getMostRecentNotes`)
    },

    getAllNotesByUserId: async () => {
        const {userId} = UserNoteService.getUserCredentials();
        return await axios.get(`${BASE_URL}/getAllNotesById/${userId}`)
    },

    getSavedNotes: async () => {
        const {userId} = UserNoteService.getUserCredentials();
        return await axios.get(`${BASE_URL}/getSavedNotes/${userId}`)
    },

    getFollowersByUserId: async () => {
        const {userId} = UserNoteService.getUserCredentials();
        return await axios.get(`${BASE_URL}/getFollowersById/${userId}`)
    },

    getFollowingByUserId: async () => {
        const {userId} = UserNoteService.getUserCredentials();
        return await axios.get(`${BASE_URL}/getFollowingById/${userId}`)
    },

    followUser: async (followerName: string): Promise<boolean> => {
        try {
            const {userId} = UserNoteService.getUserCredentials();
            const url = concatUrl(`addFollowerById/${userId}/${followerName}`)
            const response = await axios.post(url);
            return response.status === 200;
        } catch (e) {
            console.log(e)
            return false
        }
    },

    addToFollowList: async (followerName: string): Promise<boolean> => {
        try {
            const {userId} = UserNoteService.getUserCredentials();
            const url = concatUrl(`addToFollowersList/${userId}/${followerName}`)
            const response = await axios.post(url);
            return response.status === 200;
        } catch (e) {
            console.log(e)
            return false
        }
    },

    removeFromFollowers: async (followerName: string): Promise<boolean> => {
        try {
            const {userId} = UserNoteService.getUserCredentials();
            const url = concatUrl(`removeFollower/${userId}/${followerName}`)
            const response = await axios.delete(url);
            return response.status === 200;
        } catch (e) {
            console.log(e)
            return false
        }
    },

    unfollowUser: async (followingName: string): Promise<boolean> => {
        try {
            const {userId} = UserNoteService.getUserCredentials();
            const url = concatUrl(`removeFollowing/${userId}/${followingName}`)
            const response = await axios.delete(url);
            return response.status === 200;
        } catch (e) {
            console.log(e)
            return false
        }
    },

    deleteNoteById: async (noteId: string): Promise<boolean> => {
        try {
            const {userId} = UserNoteService.getUserCredentials();
            const url = concatUrl(`deleteByUserIdAndNoteId/${userId}/${noteId}`)
            const response = await axios.delete(url)
            return response.status === 200;
        } catch (e) {
            console.log(e);
            return false
        }
    },

    saveNoteToSavedNotes: async (userNote: any): Promise<UserNote> => {
        console.log("Saved Note is: ", userNote)
        const postData = await axios.post<UserNote>(`${BASE_URL}/saveNote`, userNote)
        return postData.data;
    },

    editNoteById: async (note: UserNote): Promise<boolean> => {
        try {
            const url = concatUrl('editById')
            const response = await axios.post(url, note)
            return response.status === 200;
        } catch (e) {
            console.log(e)
            return false
        }
    },

    getPublicFilteredNotes: async (filter: any)=> {
            return await axios.post(`${BASE_URL}/search`, filter)
    },

    getPro: async () : Promise<boolean>=> {
        const {userId} = UserNoteService.getUserCredentials();
        const response = await axios.get(`${BASE_URL}/getpro/${userId}`)
        return response.data.proStatus
    },

}

export default UserNoteService;
