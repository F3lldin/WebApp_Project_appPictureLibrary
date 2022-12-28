//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON ="picture-library.json";
let library;  //Global varibale, Loaded async from the current server in window.load event


//use the DOMContentLoaded, or window load event to read the library async and render the images
window.addEventListener('DOMContentLoaded', async () => {

library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server 
//library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON

for (const album of library.albums) {

    //renderImage(album.headerImage, album.id, picture.id,);
    for (const picture of album.pictures) {
      renderImage(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment);
      renderImage(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
    }
  }
})

window.addEventListener('click',  () => {

  //just to confirm that the library is accessible as a global variable read async
  console.log (`library has ${library.albums.length} albums`);
});

//Render the images
function renderImage(src, tag, Title, Comment) {

  const div = document.createElement('div');
  div.className = `FlexItem`;
  div.dataset.albumId = tag;

  const img = document.createElement('img');
  img.src = src;
  img.alt = Comment;
  div.appendChild(img);

  const title = document.createElement('p');
  title.className = 'title';
  title.innerHTML = Title;
  div.appendChild(title);

  const comment = document.createElement('p');
  comment.className = 'comment';
  comment.innerHTML = Comment;
  div.appendChild(comment);

   //POPUP PART
   const popup = document.getElementById('myPopup');
   const carouselTitle = document.getElementById('carouselTitle');
   const pic = document.getElementById('img01');
   const pictureText = document.getElementById('pictureText');

   img.onclick = function(){
       popup.style.display = "block";
       carouselTitle.innerHTML= Title;
       pic.src = this.src;
       pictureText.innerHTML= this.alt;
   }

   var span = document.getElementsByClassName('close')[0];

   span.onclick = function(){
       popup.style.display="none";
   }

  //Logic for Edit Button

  const smallDiv = document.createElement('div');
  smallDiv.className = "smallDivForEditBtn";

  const editBtn = document.createElement('button');
  editBtn.className = "editBtn";
  editBtn.id = tag;
  editBtn.innerHTML = "Edit";
  smallDiv.appendChild(editBtn); 

  let pageContent = document.querySelector(".pageContent");
  let closeBtn = document.querySelector(".windowModalHeader .btnCloseModal"); 
  let modalTitle = document.getElementById("modalTitle");
  let modalDescription = document.getElementById("modalDescription"); 

  editBtn.addEventListener('click', () => {

    pageContent.style.display = "block";
    modalTitle.value = Title;
    modalDescription.value = Comment;

    let submitBtn = document.getElementById("submitBtn")
    submitBtn.addEventListener('submit', () => {
      Title = modalTitle.innerText;
      Comment = modalDescription.innerText;
    })
     

  });
 
  closeBtn.addEventListener('click', () => { pageContent.style.display = "none"; }) 

  window.addEventListener('click', (e) => {

    if (e.target == pageContent) {
      pageContent.style.display = "none";
    }

  });

  div.appendChild(smallDiv);  

  const imgFlex = document.querySelector('.FlexWrap');
  imgFlex.appendChild(div);
};

