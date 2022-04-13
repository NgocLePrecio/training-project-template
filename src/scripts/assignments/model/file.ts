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
  updateFile: (title: string, user: string, dateString: string,curRowNum: number ,data:FileData) => {
    $(`table tbody tr:eq(${curRowNum}) td:eq(1)`).text(title);
    $(`table tbody tr:eq(${curRowNum}) td:eq(2)`).text(dateString);
    $(`table tbody tr:eq(${curRowNum}) td:eq(3)`).text(user);
    data.title = title;
    data.modifiedAt = dateString;
    data.modifiedBy = user;
    localStorage.setItem(curRowId, JSON.stringify(data));
  },
  deleteFile: (curRowId: string, curFolder: string) => {
    let curfolderData: Folder = JSON.parse(localStorage.getItem(curFolder));
    curfolderData.filesAndFolders = curfolderData.filesAndFolders.filter(id => id !== curRowId);
    localStorage.setItem(curFolder, JSON.stringify(curfolderData));
    localStorage.removeItem(curRowId);
    loadData(curFolder);
  }
};
