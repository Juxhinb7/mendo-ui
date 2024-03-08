export interface BasicIDAndTitleFields {
    id: string,
    title: string
}

export interface ProjectDetailStateFields {
    id: string,
    user: string,
    title: string,
    description: string,
    hashtags: BasicIDAndTitleFields[],
    sprints: BasicIDAndTitleFields[],
    epics: BasicIDAndTitleFields[],
    comments: {[key: string]: string}[]

}
