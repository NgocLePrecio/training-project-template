// Get the File modal
var filemodal = document.getElementById("addFileModal");
// Get the button that opens the modal
var filebtn = document.getElementById("btnAddFile");
// When the user clicks the button, open the modal 
filebtn.onclick = function () {
    filemodal.style.display = "block";
};
function closeFileModal() {
    filemodal.style.display = "none";
}
// Get the <span> element that closes the modal
var spanFile = document.getElementById("closeFile");
// When the user clicks on <span> (x), close the modal
spanFile.addEventListener("click", closeFileModal);
// Get the Folder modal
var foldermodal = document.getElementById("addFolderModal");
// Get the button that opens the modal
var folderbtn = document.getElementById("btnAddFolder");
folderbtn.onclick = function () {
    foldermodal.style.display = "block";
};
function closeFolderModal() {
    foldermodal.style.display = "none";
}
// Get the <span> element that closes the modal
var spanFolder = document.getElementById("closeFolder");
// When the user clicks on <span> (x), close the modal
spanFolder.addEventListener("click", closeFolderModal);
window.onclick = function (event) {
    if (event.target == filemodal) {
        filemodal.style.display = "none";
    }
    else if (event.target == foldermodal) {
        foldermodal.style.display = "none";
    }
};
