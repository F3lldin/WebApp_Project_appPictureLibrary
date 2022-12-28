"use strict"; // Try without strict mode

import { pictureLibraryBrowser } from "../model/picture-library-browser.js";

const libraryJSON = "picture-library.json";
let library; //Global varibale, Loaded async from the current server in window.load event

let slideIndex = 1;

//use the DOMContentLoaded, or window load event to read the library async and render the images
window.addEventListener("DOMContentLoaded", async () => {
  
  // get all slideshow-images from local storage
  const pictures = JSON.parse(sessionStorage.getItem("pictureToDisplay"));
  library = await pictureLibraryBrowser.fetchJSON(libraryJSON);
  Left();
  for(const album of library.albums){
    for(const pic of pictures){
      for(const picture of album.pictures){
        if(picture.id === pic){
          renderImage(`${album.path}/${picture.imgHiRes}`, picture.id, picture.title, picture.comment);
        }
      }
    }
  }
  ShowSlideShow(slideIndex);
  Right();

});

function renderImage(src, tag, Title, Comment){

  const div =  document.createElement('div');
  div.className = 'DisplayedSlideShow';
  div.dataset.pictureId = tag;

  const title = document.createElement('p');
  title.className = 'Title';
  title.innerHTML = Title;
  div.appendChild(title);

  const img = document.createElement('img');
  img.src = src;
  img.alt = Comment; 
  div.appendChild(img);

  const comment = document.createElement('p');
  comment.className = 'Comment';
  comment.innerHTML = Comment;
  div.appendChild(comment);
  

  const imgFlex = document.querySelector('.FlexWrap');
  imgFlex.appendChild(div);

};

function ShowSlideShow(num){
  let i;

  let slidePics = document.getElementsByClassName("DisplayedSlideShow");
  if(num > slidePics.length) {
    slideIndex = 1;
  }
  if(num < 1){
    slideIndex = slidePics.length;
  }
  for(i = 0; i < slidePics.length; i++){
    slidePics[i].style.display = "none";
  }

  slidePics[slideIndex - 1].style.display = "block";
};

//LEFT AND RIGHT ARROW
function Right(){

  const rightArrow = document.createElement('a');
  rightArrow.className = 'next';
  rightArrow.textContent='>';
  rightArrow.onclick= function (){

    NextSlide(1);

  }

  const imgFlex = document.querySelector('.FlexWrap');
  imgFlex.appendChild(rightArrow);

}

function Left(){
  const leftArrow = document.createElement('a');
  leftArrow.className= 'prev';
  leftArrow.textContent= '<';
  leftArrow.onclick= function(){

    NextSlide(-1);
  }

  const imgFlex = document.querySelector('.FlexWrap');
  imgFlex.appendChild(leftArrow);

}

function NextSlide(n) {
  ShowSlideShow(slideIndex += n);
}

function CurrentSlide(n) {
  ShowSlideShow(slideIndex = n);
}


  