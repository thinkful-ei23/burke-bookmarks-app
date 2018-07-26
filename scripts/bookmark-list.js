'use strict';

/* global $ store api Bookmark*/

const bookmarkList = (function() {

  // event handler for the drop down filter menu
  const handleFilterBar = function() {
    $('.js-filter-bar').change(() => {
      const filter = $(':selected').val();
      const filterInt = parseInt(filter, 10);
      store.changeFilter(filterInt);
      render();
    });
  };

  // event handler for the delete element button 
  const handleDeleteBookmark = function() {
    $('.js-bookmark-list').on('click', '.js-delete', (e) => {
      const bookmarkId = $(e.currentTarget).closest('.bookmark').attr('id');
      api.deleteDataOnServer(bookmarkId, () => {
        store.deleteBookmark(bookmarkId);
        render();
      });
    });
  };

  // event handler for the expand bookmark feature
  const handleExpandButton = function() {
    $('.js-bookmark-list').on('click', '.js-expand', (e) => {
      const bookmarkId = $(e.currentTarget).closest('.bookmark').attr('id'); 
      const obj = store.findById(bookmarkId);
      obj.expanded = true;
      render();
    });
  };

  const handleRevertButton = function() {
    $('.js-bookmark-list').on('click', '.js-retract', (e) => {
      const bookmarkId = $(e.currentTarget).closest('.bookmark').attr('id'); 
      const obj = store.findById(bookmarkId);
      obj.expanded = false;
      render();
    });
  };
  // event handler for the create element button (set on the create button itself)
  const handleCreateButton = function() {
    $('.js-bookmark-list').on('click', '.create', (e) => {
      if (store.bookmarks.createFormOpen === false) {
        store.bookmarks.createFormOpen = true;
        render();
      }
    });
  };

  // event handler to close form on create element form
  const handleReturnButton = function() {
    $('.js-bookmark-list').on('click', '.js-revert-extended', (e) => {
      store.bookmarks.createFormOpen = false;
      render();
    });
  };

  // event handler to add bookmark to store and server
  const handleSubmitButton = function() {
    $('.js-bookmark-list').on('submit', '#js-add-bookmark-form', (e) => {
      e.preventDefault();
      const title = $('.js-bookmark-title-entry').val();
      const url = $('.js-bookmark-url-entry').val();
      const description = $('.js-bookmark-description-entry').val();
      const rating = $('.js-bookmark-rating-entry').val();
      const newBookmark = Bookmark.create(title, url, description, rating); 
      // send bookmark to server
      api.sendBookmarkToServer(newBookmark, (response) => {
        store.bookmarks.createFormOpen = false;
        store.addBookmark(response);
        render();
      });
    });
  };

  // render each bookmark element
  const renderCreateForm = function() {
    if (store.bookmarks.createFormOpen === false) {
      return `<li>
                <button class='create inList'>
                <p>Create bookmark</p>
                </button>
              </li>`;
    } else {
      return `<li>
                <div class="inList">
                  <button class="js-revert-extended">
                    <span class="fas fa-caret-down"></span>
                  </button>
                  <form id="js-add-bookmark-form">
                      <label for="bookmark-title-entry">Add a title</label>
                      <input required type="text" name="bookmark-title-entry" class="js-bookmark-title-entry">
                      <label for="bookmark-url-entry">Add a url</label>
                      <input required type="text" name="bookmark-url-entry" class="js-bookmark-url-entry" value="https://">
                      <label for="bookmark-description-entry">Add a description</label>
                      <input type="text" name="bookmark-description-entry" class="js-bookmark-description-entry">
                      <label for="bookmark-rating">Rate your bookmark</label>
                      <input type="number" name="bookmark-rating" class="js-bookmark-rating-entry" min="1" max="5" value="1">
                    <button type="submit">Add bookmark</button>
                  </form>
                </div>
              </li>`;
    }
  };

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
    if (obj.expanded === true) {
      return `<li>
                <div class='inList bookmark' id=${obj.id}>
                <button class='retract js-retract'>
                  <span class="fas fa-caret-down"></span>
                </button>
                <p>${obj.title}</p>
                <p>${obj.description}</p>
                <a href='${obj.url}'>Visit this bookmark</a>
                ${renderRating(obj)}
                <button class='delete js-delete'>
                  <span class="fas fa-times"></span>
                </button>
              </div>
            </li>`;
    } else {
      return `<li>
                <div class='inList bookmark' id=${obj.id}>
                  <button class='expand js-expand'><span class="fas fa-caret-right"></span></button>
                  <p>${obj.title}</p>
                  ${renderRating(obj)}
                  <button class='delete js-delete'>
                    <span class="fas fa-times"></span>
                  </button>
                </div>
              </li>
    `;
    }
  };

  // iterates through the bookmarks array and renders bookmark for each element. Join the array into one long string. 
  const renderList = function() {
    if (store.bookmarks.filter > 0) {
      const htmlArray = store.bookmarks.items.filter(element => element.rating >= store.bookmarks.filter)
        .map(element => renderBookmark(element));
      return htmlArray.join('');
    } else {
      const htmlArray = store.bookmarks.items.map(element => renderBookmark(element));
      return htmlArray.join('');
    }
  };

  // append the bookmark list after the create bookmark item, which always stays at the top of the list
  const render = function() {
    $('.bookmark-list').html(renderList());
    $('.bookmark-list').prepend(renderCreateForm());
  };

  const bindEventListeners = function() {
    handleFilterBar();
    handleDeleteBookmark();
    handleCreateButton();
    handleReturnButton();
    handleSubmitButton();
    handleExpandButton();
    handleRevertButton();
  };

  return {
    render,
    bindEventListeners
  };

}());