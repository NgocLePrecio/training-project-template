interface FileData {
  id: string;
  title: string;
  parentFolderId: string;
  type: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
}

const fileManager = {
  createFile: (
    fileName: string,
    curFolder: string,
    user: string,
  ): FileData => {
    let today = new Date();
    let newFile: FileData = {
      id: createGuid(),
      title: fileName,
      type: 'file',
      parentFolderId: curFolder,
      createdAt:
        today.getDate().toString() +
        '/' +
        (today.getMonth() + 1).toString(),
      createdBy: user,
      modifiedAt: '',
      modifiedBy: '',
    };
    localStorage.setItem(newFile.id, JSON.stringify(newFile));
    let curfolderData: Folder = JSON.parse(
      localStorage.getItem(curFolder),
    );
    curfolderData.filesAndFolders.push(newFile.id);
    localStorage.setItem(
      curfolderData.id,
      JSON.stringify(curfolderData),
    );
    return newFile;
  },
};
