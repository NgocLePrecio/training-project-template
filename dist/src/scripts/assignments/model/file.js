var fileManager = {
    createFile: function (fileName, curFolder, user) {
        var today = new Date();
        var newFile = {
            id: createGuid(),
            title: fileName,
            type: 'file',
            parentFolderId: curFolder,
            createdAt: today.getDate().toString() +
                '/' +
                (today.getMonth() + 1).toString(),
            createdBy: user,
            modifiedAt: '',
            modifiedBy: '',
        };
        localStorage.setItem(newFile.id, JSON.stringify(newFile));
        var curfolderData = JSON.parse(localStorage.getItem(curFolder));
        curfolderData.filesAndFolders.push(newFile.id);
        localStorage.setItem(curfolderData.id, JSON.stringify(curfolderData));
        return newFile;
    },
};
