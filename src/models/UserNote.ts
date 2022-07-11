
export type UserNote = {
    _id: string;
    files: UserNoteFile[];
} & UserNoteAttributes & UserNoteUserAttributes



export type UserNoteUserAttributes = {
    userId: string;
    userEmail: string;
    userDisplayName: string;
}


export type UserNoteAttributes = {
    title: string;
    course: UserNoteCourseAttributes;
    visibility: boolean;
    rating: number;
    date: string;
}

export type UserNoteCourseAttributes = {
    name: string;
    className: string;
    label: string;
    _id?: string | number;
}

export type UserNoteFile = {
    fileName: string;
    contentType: string | undefined;
    size: number;
    url: string;
}
