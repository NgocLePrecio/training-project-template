var folderManager = {
    createFolder: function (folderName, curFolder, user, isRoot) {
        var today = new Date();
        var newFolder = {
            id: isRoot === true ? 'root' : createGuid(),
            title: folderName,
            parentFolderId: isRoot === true ? 'root' : curFolder,
            type: 'folder',
            createdAt: today.getDate().toString() +
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
