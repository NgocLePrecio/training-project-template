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
  updateFolder: (title: string, user: string, dateString: string,curRowNum: number, data:Folder) => {
    $(`table tbody tr:eq(${curRowNum}) td:eq(1) a`).text(title);
    $(`table tbody tr:eq(${curRowNum}) td:eq(2)`).text(dateString);
    $(`table tbody tr:eq(${curRowNum}) td:eq(3)`).text(user);
    data.title = title;
    data.modifiedAt = dateString;
    data.modifiedBy = user;
    localStorage.setItem(curRowId, JSON.stringify(data));
  },
  deleteFolder: (curRowId: string, curFolder: string, data: Folder) => {
    // Delete data inside deleted folder
    deleteAllFolder(data);
    // Delete the data in currrent folder
    let curfolderData: Folder = JSON.parse(localStorage.getItem(curFolder));
    curfolderData.filesAndFolders = curfolderData.filesAndFolders.filter(id => id !== curRowId);
    localStorage.setItem(curFolder, JSON.stringify(curfolderData));
    localStorage.removeItem(curRowId);
    loadData(curFolder);
  }
};

function deleteAllFolder(folder: Folder){
  folder.filesAndFolders.forEach((item:string) => {
    let data: any = JSON.parse(localStorage.getItem(item));
    if (data.type === 'folder') {
      deleteAllFolder(data);
    };
    localStorage.removeItem(item);
  })
}


