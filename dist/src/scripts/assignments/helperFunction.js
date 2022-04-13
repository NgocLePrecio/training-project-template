// Helper function
function appendTableBody(newData) {
    var newRow;
    if (newData.type === 'folder') {
        if (newData.modifiedAt !== '') {
            newRow = "<tr><td><input type='radio' name='rowId' data-id='".concat(newData.id, "'/> <i class=\"fa fa-folder\"></i></td><td><a href='#' class='folderLink' data-id='").concat(newData.id, "'>").concat(newData.title, "</a></td><td>").concat(newData.modifiedAt, "</td><td>").concat(newData.modifiedBy, "</td><td></td></tr>");
        }
        else {
            newRow = "<tr><td><input type='radio' name='rowId' data-id='".concat(newData.id, "'/> <i class=\"fa fa-folder\"></i></td><td><a href='#' class='folderLink' data-id='").concat(newData.id, "'>").concat(newData.title, "</a></td><td>").concat(newData.createdAt, "</td><td>").concat(newData.createdBy, "</td><td></td></tr>");
        }
    }
    else if (newData.type === 'file') {
        if (newData.modifiedAt !== '') {
            newRow = "<tr><td><input type='radio' name='rowId' data-id='".concat(newData.id, "'/> <i class=\"fa fa-file-text-o\"></i></td><td>").concat(newData.title, "</td><td>").concat(newData.modifiedAt, "</td><td>").concat(newData.modifiedBy, "</td><td></td></tr>");
        }
        else {
            newRow = "<tr><td><input type='radio' name='rowId' data-id='".concat(newData.id, "'/> <i class=\"fa fa-file-text-o\"></i></td><td>").concat(newData.title, "</td><td>").concat(newData.createdAt, "</td><td>").concat(newData.createdBy, "</td><td></td></tr>");
        }
    }
    $('tbody').append(newRow);
}
function loadData(curFolder) {
    $('tbody').empty();
    $('#overlay').fadeIn(300);
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            var curfolderData = JSON.parse(localStorage.getItem(curFolder));
            var listFilesAndFolder = curfolderData.filesAndFolders;
            resolve(listFilesAndFolder);
        }, 1000);
    }).then(function (listFilesAndFolder) {
        $('#overlay').fadeOut(150);
        for (var i = 0; i < listFilesAndFolder.length; i++) {
            var newData = JSON.parse(localStorage.getItem(listFilesAndFolder[i]));
            appendTableBody(newData);
        }
        $('#btnUpdate').attr('disabled', 'disabled');
        $('#btnDelete').attr('disabled', 'disabled');
    });
}
function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function Initialize() {
    // Create or Load root folder
    curFolder = 'root';
    var rootData = localStorage.getItem(curFolder);
    if (rootData == null) {
        folderManager.createFolder('root', curFolder, 'admin', true);
    }
    else {
        loadData(curFolder);
    }
    // DOM Manipulation
    $('#updateModal').addClass('dialogHidden');
    $('#folderModal').addClass('dialogHidden');
    $('#btnUpdate').attr('disabled', 'disabled');
    $('#btnDelete').attr('disabled', 'disabled');
}
