'use strict';

/* global $ store*/

const bookmarkList = (function() {
  // need event handlers for everything the user can click on in the dom

  // event handler for the drop down filter menu
  const handleFilterBar = function() {
    $('.js-filter-bar').change(() => {
      const filter = $(':selected').val();
      const filterInt = parseInt(filter, 10);
      store.changeFilter(filterInt);
      console.log(store.bookmarks.filter);
    });
  };

  // event handler for the delete element button (set on the x button that is a part of the form)

  // event handler for the expand bookmark feature (set on the ul)

  // event handler for the create element button (set on the create button itself)

  // event handler to close form on create element form

  // event handler for the submit on the create element form

  // render each bookmark element

  // render an individual heart rating
  const renderHeart = function(bool) {
    if (bool === true) {
      // return full heart
      return '<span class="fas fa-heart"></i>';
    } else {
      // return empty heart
      return '<span class="far fa-heart"></i>';
    }
  };

  // returns the list of html elements that show that element's rating
  const renderRating = function(obj) {
    const rating = obj.rating;
    const heartArray = [];
    // push the amount of hearts = rating
    for (let i = 0; i < rating; i++) {
      heartArray.push(renderHeart(true));
    }
    // push the amount of empty hearts afterwards
    for (let i = 0; i < (5 - rating); i++) {
      heartArray.push(renderHeart(false));
    }
    return heartArray.join('');
  };

  const renderBookmark = function(obj) {
    // ***** HTML element here is a stand in for what the HTML will eventually look like
    return `
    <li>
      <div class='inList bookmark'>
        <span class="fas fa-caret-right"></span>
        <p>${obj.name}</p>
        ${renderRating(obj)}
        <span class="fas fa-times"></span>
      </div>
    </li>
    `;
  };

  // iterates through the bookmarks array and rendersBookmark for each element. Join the array into one long string. 
  const renderList = function() {
    const htmlArray = store.bookmarks.items.map(element => renderBookmark(element));
    return htmlArray.join('');
  };

  // append the bookmark list after the create bookmark item, which always stays at the top of the list
  const render = function() {
    $( '.create-bookmark').after(renderList());
  };

  const bindEventListeners = function() {
    handleFilterBar();
  };

  return {
    render,
    bindEventListeners
  };

}());