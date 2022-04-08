import File from './FileModel'

export default interface Folder {
    id: string
    name: string
    files: string[]
    subFolder: string[]
    parentFolderId: string
    createdAt: string
    createdBy: string
    modifiedAt: string
    modifiedBy: string
}

