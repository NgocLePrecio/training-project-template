// Helper function
function appendTableBody(newData: any) {
  let newRow: string;
  if (newData.type === 'folder') {
    if (newData.modifiedAt !== '') {
      newRow = `<tr><td><input type='radio' name='rowId' data-id='${newData.id}'/> <i class="fa fa-folder"></i></td><td><a href='#' class='folderLink' data-id='${newData.id}'>${newData.title}</a></td><td>${newData.modifiedAt}</td><td>${newData.modifiedBy}</td><td></td></tr>`;
    } else {
      newRow = `<tr><td><input type='radio' name='rowId' data-id='${newData.id}'/> <i class="fa fa-folder"></i></td><td><a href='#' class='folderLink' data-id='${newData.id}'>${newData.title}</a></td><td>${newData.createdAt}</td><td>${newData.createdBy}</td><td></td></tr>`;
    }
  } else if (newData.type === 'file') {
    if (newData.modifiedAt !== '') {
      newRow = `<tr><td><input type='radio' name='rowId' data-id='${newData.id}'/> <i class="fa fa-file-text-o"></i></td><td>${newData.title}</td><td>${newData.modifiedAt}</td><td>${newData.modifiedBy}</td><td></td></tr>`;
    } else {
      newRow = `<tr><td><input type='radio' name='rowId' data-id='${newData.id}'/> <i class="fa fa-file-text-o"></i></td><td>${newData.title}</td><td>${newData.createdAt}</td><td>${newData.createdBy}</td><td></td></tr>`;
    }
  }
  $('tbody').append(newRow);
}

function loadData(curFolder: string) {
  $('tbody').empty();
  $('#overlay').fadeIn(300);
  const promise = new Promise<string[]>((resolve, reject) => {
    setTimeout(function() {
      let curfolderData: Folder = JSON.parse(
        localStorage.getItem(curFolder),
      );
      let listFilesAndFolder = curfolderData.filesAndFolders;
      resolve(listFilesAndFolder);
    }, 1000);
  }).then(listFilesAndFolder => {
    $('#overlay').fadeOut(150);
    for (let i = 0; i < listFilesAndFolder.length; i++) {
      let newData = JSON.parse(
        localStorage.getItem(listFilesAndFolder[i]),
      );
      appendTableBody(newData);
    }
    $('#btnUpdate').attr('disabled', 'disabled');
    $('#btnDelete').attr('disabled', 'disabled');
  });
}

function createGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    },
  );
}

function Initialize() {
  // Create or Load root folder
  curFolder = 'root';
  const rootData = localStorage.getItem(curFolder);
  if (rootData == null) {
    folderManager.createFolder('root', curFolder, 'admin', true);
  } else {
    loadData(curFolder);
  }

  // DOM Manipulation
  $('#updateModal').addClass('dialogHidden');
  $('#folderModal').addClass('dialogHidden');
  $('#btnUpdate').attr('disabled', 'disabled');
  $('#btnDelete').attr('disabled', 'disabled');
}
