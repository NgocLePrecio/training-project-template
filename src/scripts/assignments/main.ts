let curFolder: string = '';
let curRowId: string = '';
let curRowNum: number;

$(function() {
  // Create or Load root folder
  Initialize();
  
  // Add Folder
  $('#btnAddFolder').on('click', function(evt) {
    let top: any = 0;
    let left: any = 0;
    if ($('#folderModal').hasClass('dialogHidden')) {
      $('#folderModal').removeClass('dialogHidden');
    }
    $('#folderModal').addClass('dialogVisible');
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var dialogHeight = $('#folderModal').outerHeight();
    var dialogWidth = $('#folderModal').outerWidth();
    top =
      (windowHeight - dialogHeight) / 2 +
      $(window).scrollTop() +
      'px';
    left =
      (windowWidth - dialogWidth) / 2 + $(window).scrollLeft() + 'px';
    $('#folderModal').css('top', top);
    $('#folderModal').css('left', left);
    $('#backgroundDiv')
      .addClass('dialogBackground')
      .height(windowHeight)
      .width(windowWidth)
      .css('display', 'block');
    evt.preventDefault();
  });

  $('#CancelBtn').on('click', function(evt) {
    closeModal(evt);
  });

  $('#OkFolderBtn').on('click', function(evt) { 
    let newFolderName = $('#folderName').val().toString();
    let newFolder = folderManager.createFolder(newFolderName,curFolder,'admin',false);
    let curfolderData : Folder = JSON.parse(localStorage.getItem(curFolder));
    curfolderData.filesAndFolders.push(newFolder.id);
    localStorage.setItem(curfolderData.id, JSON.stringify(curfolderData));    
    appendTableBody(newFolder);
    closeModal(evt);
  });
  // End Add Folder

  // Update file and folder
  $('#btnUpdate').on('click', function(evt) {
    let top: any = 0;
    let left: any = 0;
    if ($('#updateModal').hasClass('dialogHidden')) {
      $('#updateModal').removeClass('dialogHidden');
    }
    $('#updateModal').addClass('dialogVisible');
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var dialogHeight = $('#updateModal').outerHeight();
    var dialogWidth = $('#updateModal').outerWidth();
    top =
      (windowHeight - dialogHeight) / 2 +
      $(window).scrollTop() +
      'px';
    left =
      (windowWidth - dialogWidth) / 2 + $(window).scrollLeft() + 'px';
    $('#updateModal').css('top', top);
    $('#updateModal').css('left', left);
    $('#backgroundDiv')
      .addClass('dialogBackground')
      .height(windowHeight)
      .width(windowWidth)
      .css('display', 'block');
    evt.preventDefault();
  });

  $('#CancelUpdateBtn').on('click', function(evt) {
    closeModal(evt);
  });

  $('#OkUpdateBtn').on('click', function(evt) { 
    let data: any = JSON.parse(localStorage.getItem(curRowId));
    let newDataTitle = $('#dataTitle').val().toString();
    let user = $('#dataUser').val().toString();
    let today = new Date();
    let dateString = today.getDate().toString() + '/' + (today.getMonth() + 1).toString();

    if (data.type === 'folder') {
        folderManager.updateFolder(newDataTitle,user,dateString,curRowNum,data);
    }
    else if (data.type === 'file') {
        fileManager.updateFile(newDataTitle,user,dateString,curRowNum,data);
    }
    closeModal(evt);
  });
  // End Update file and folder

  // Add File
  $('#btnAddFile').on('click', function() {
    let fileUpload: any = $('#fileUpload');
    let file = fileUpload[0];
    if ('files' in file) {
      console.log(fileUpload[0].files.length);
      if (file.files.length === 0) {
        alert('No file chosen');
      } else {
        let filex = file.files[0];
        let newFile: FileData = fileManager.createFile(
          filex.name,
          curFolder,
          'admin',
        );
        appendTableBody(newFile);
        $('#fileUpload').val('');
      }
    }
  });

  // Delete button click
  $('#btnDelete').on('click', function() {
    // If data is a folder. delete all items inside
    let data: any = JSON.parse(localStorage.getItem(curRowId));
    if (data.type === 'folder') {
        folderManager.deleteFolder(curRowId,curFolder,data);
    }
    else if (data.type === 'file') {
        fileManager.deleteFile(curRowId,curFolder)
    }
  });

  // Folder Link Click
  $('tbody').on('click', '.folderLink',function() {
      let folderId = $(this).attr('data-id');
      curFolder = folderId;
      loadData(curFolder);
  });

  // Radio Button Click
  $('tbody').on('click', 'input:radio[name="rowId"]', function() {
      curRowId = $('input[name="rowId"]:checked').attr('data-id');
      curRowNum = $(this).parent().parent().index();
      $('#btnUpdate').removeAttr('disabled');
      $('#btnDelete').removeAttr('disabled');
  });

  // Back link click
  $('#backLink').on('click',function(){
    const curfolderData: Folder = JSON.parse(localStorage.getItem(curFolder));
    curFolder = curfolderData.parentFolderId;
    loadData(curFolder);
  })
});

const closeModal = (evt: any) => {
  $('#folderName').val('');
  $('#dataTitle').val('');
  $('#dataUser').val('');
  if ($('#backgroundDiv').hasClass('dialogBackground')) {
    $('#backgroundDiv')
      .removeClass('dialogBackground')
      .css('display', 'none');
  }
  if ($('#folderModal').hasClass('dialogVisible')) {
    $('#folderModal').removeClass('dialogVisible');
  }
  if ($('#updateModal').hasClass('dialogVisible')) {
    $('#updateModal').removeClass('dialogVisible');
  }
  $('#folderModal').addClass('dialogHidden');
  $('#updateModal').addClass('dialogHidden');
  evt.preventDefault();
};

$(window).on('resize', function() {
  if ($('#folderModal').hasClass('dialogVisible')) {
    $('#btnAddFile').trigger('click');
  }
});
