interface Folder {
  id: string;
  title: string;
  filesAndFolders: string[];
  parentFolderId: string;
  type: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
}

const folderManager = {
  createFolder: (
    folderName: string,
    curFolder: string,
    user: string,
    isRoot: boolean,
  ): Folder => {
    let today = new Date();
    let newFolder: Folder = {
      id: isRoot === true ? 'root' : createGuid(),
      title: folderName,
      parentFolderId: isRoot === true ? 'root' : curFolder,
      type: 'folder',
      createdAt:
        today.getDate().toString() +
        '/' +
        (today.getMonth() + 1).toString(),
      createdBy: user,
      modifiedAt: '',
      modifiedBy: '',
      filesAndFolders: [],
    };
    localStorage.setItem(newFolder.id, JSON.stringify(newFolder));

    return newFolder;
  },
};


