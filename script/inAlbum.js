//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON ="picture-library.json";
let library;  //Global varibale, Loaded async from the current server in window.load event


//use the DOMContentLoaded, or window load event to read the library async and render the images
window.addEventListener('DOMContentLoaded', async () => {

const getAlbumId = JSON.parse(sessionStorage.getItem("chosenAlbum")) || []
library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server

  for(const album of library.albums){
    if(album.id === getAlbumId){
        for(const picture of album.pictures){
            renderImage(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
            renderImage(`${album.path}/${picture.imgLoRes}`, picture.id, picture.title, picture.comment);

        }
    }
  }


});

//Render the images
function renderImage(src, tag, Title, Comment) {

    const div = document.createElement('div');
    div.className = `FlexItem`;
    div.dataset.pictureId = tag;
  
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
        //sessionStorage.setItem('chosenPic', JSON.stringify(tag));
    }

    var span = document.getElementsByClassName('close')[0];

    span.onclick = function(){
        popup.style.display="none";
    }
    
    //CHECKBOX
    const smallDiv = document.createElement('div');
    smallDiv.className = "smallDivForCheckBox";

    const checkBox = document.createElement("input");
    checkBox.className= "checked";
    checkBox.id = tag;
    checkBox.setAttribute("type", "checkbox");
    smallDiv.appendChild(checkBox);
    div.appendChild(smallDiv);
  
    const imgFlex = document.querySelector('.FlexWrap');
    imgFlex.appendChild(div);

    //SLIDESHOW
    const slideshowButton = document.createElement('')
    const popup = document.getElementById('myPopup');
    const carouselTitle = document.getElementById('carouselTitle');
    const pic = document.getElementById('img01');
    const pictureText = document.getElementById('pictureText');

    img.onclick = function(){
        popup.style.display = "block";
        carouselTitle.innerHTML= Title;
        pic.src = this.src;
        pictureText.innerHTML= this.alt;
        //sessionStorage.setItem('chosenPic', JSON.stringify(tag));
    }

    var span = document.getElementsByClassName('close')[0];

    span.onclick = function(){
        popup.style.display="none";
    }

  };




