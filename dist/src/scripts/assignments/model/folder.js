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
    updateFolder: function (title, user, dateString, curRowNum, data) {
        $("table tbody tr:eq(".concat(curRowNum, ") td:eq(1) a")).text(title);
        $("table tbody tr:eq(".concat(curRowNum, ") td:eq(2)")).text(dateString);
        $("table tbody tr:eq(".concat(curRowNum, ") td:eq(3)")).text(user);
        data.title = title;
        data.modifiedAt = dateString;
        data.modifiedBy = user;
        localStorage.setItem(curRowId, JSON.stringify(data));
    },
    deleteFolder: function (curRowId, curFolder, data) {
        // Delete data inside deleted folder
        data.filesAndFolders.forEach(function (item) {
            localStorage.removeItem(item);
        });
        // Delete the data in currrent folder
        var curfolderData = JSON.parse(localStorage.getItem(curFolder));
        curfolderData.filesAndFolders = curfolderData.filesAndFolders.filter(function (id) { return id !== curRowId; });
        localStorage.setItem(curFolder, JSON.stringify(curfolderData));
        localStorage.removeItem(curRowId);
        loadData(curFolder);
    }
};
