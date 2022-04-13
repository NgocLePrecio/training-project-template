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
    updateFile: function (title, user, dateString, curRowNum, data) {
        $("table tbody tr:eq(".concat(curRowNum, ") td:eq(1)")).text(title);
        $("table tbody tr:eq(".concat(curRowNum, ") td:eq(2)")).text(dateString);
        $("table tbody tr:eq(".concat(curRowNum, ") td:eq(3)")).text(user);
        data.title = title;
        data.modifiedAt = dateString;
        data.modifiedBy = user;
        localStorage.setItem(curRowId, JSON.stringify(data));
    },
    deleteFile: function (curRowId, curFolder) {
        var curfolderData = JSON.parse(localStorage.getItem(curFolder));
        curfolderData.filesAndFolders = curfolderData.filesAndFolders.filter(function (id) { return id !== curRowId; });
        localStorage.setItem(curFolder, JSON.stringify(curfolderData));
        localStorage.removeItem(curRowId);
        loadData(curFolder);
    }
};
