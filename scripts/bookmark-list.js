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
      api.deleteDataOnServer(bookmarkId, (success) => {
        store.deleteBookmark(bookmarkId);
        render();
      });
    });
  };

  // handle close error

  const handleCloseError = function() {
    $('main').on('click', '.js-close-error', () => {
      store.bookmarks.error = '';
      console.log(store.bookmarks.error);
      render();
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
      api.sendBookmarkToServer(newBookmark, (success) => {
        store.bookmarks.createFormOpen = false;
        store.addBookmark(success);
        render();
      }, 
      (error) => {
        store.bookmarks.error = error.responseJSON.message;
        render();
      }
      );
    });
  };

  // handle every heart on the page, making them all editable
  const handleHearts = function() {
    $('.js-bookmark-list').on('click', '.fa-heart', (e) => {
      // grab element that the heart's on 
      const classNames = $(e.currentTarget).attr('class');
      const classArray = classNames.split(' ');
      const indexOfHeart = parseInt(classArray.pop(), 10);
      const bookmarkID = $(e.currentTarget).parents('.bookmark').attr('id');
      // set up new values
      const newRating = indexOfHeart + 1;
      const ratingData = { rating : newRating };
      // need to update server and store
      api.updateDataOnServer(bookmarkID, ratingData, (success) => {
        store.editRating(bookmarkID, newRating);
        render();
      }, (error) => {
        store.bookmarks.error = error.responseJSON.message;
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
                  <button aria-label="Close create bookmark form" class="js-revert-extended">
                    <span class="fas fa-caret-down"></span>
                  </button>
                  <form id="js-add-bookmark-form">
                    <div>
                      <label for="bookmark-title-entry">Add a title:</label>
                      <input required type="text" name="bookmark-title-entry" class="js-bookmark-title-entry">
                    </div>
                    <div>
                      <label for="bookmark-url-entry">Add a url:</label>
                      <input required type="url" name="bookmark-url-entry" class="js-bookmark-url-entry" placeholder="https://">
                    </div>
                    <div>
                      <label for="bookmark-description-entry">Add a description:</label>
                      <input type="text" name="bookmark-description-entry" class="js-bookmark-description-entry">
                    </div>
                    <div>
                      <label for="bookmark-rating">Rate your bookmark:</label>
                      <input type="number" name="bookmark-rating" class="js-bookmark-rating-entry" min="1" max="5" value="1">
                    </div>
                    <button class="submit" type="submit">Add bookmark</button>
                  </form>
                </div>
              </li>`;
    }
  };

  // render an individual heart rating
  const renderHeart = function(bool, index) {
    if (bool === true) {
      // return full heart
      return `<span class="fas fa-heart ${index}"></span>`;
    } else {
      // return empty heart
      return `<span class="far fa-heart ${index}"></span>`;
    }
  };

  // returns the list of html elements that show that element's rating
  const renderRating = function(obj) {
    const rating = obj.rating;
    const heartArray = [`<div class="heartBar" aria-label='${rating} hearts out of 5'>`];
    // push the amount of hearts = rating
    let fullHeartsPushed = 0;
    for (let i = 0; i < rating; i++) {
      heartArray.push(renderHeart(true, i));
      fullHeartsPushed++;
    }
    // push the amount of empty hearts afterwards
    for (let i = fullHeartsPushed; i < 5; i++) {
      heartArray.push(renderHeart(false, i));
    }
    heartArray.push('</div>');
    return heartArray.join('');
  };

  const renderBookmark = function(obj) {
    // ***** HTML element here is a stand in for what the HTML will eventually look like
    if (obj.expanded === true) {
      return ` <li>
                <div class='inList bookmark expanded' id=${obj.id}>
                  <button aria-label="Condense bookmark" class='retract js-retract'>
                      <span class="fas fa-caret-down"></span>
                  </button>
                  <p class="bookmark-title">${obj.title}</p>
                  ${renderRating(obj)}
                  <p class="desc">Description:</p>
                  <p class="desc">${obj.desc}</p>
                  <a href='${obj.url}'>Visit this site</a>
                  <button aria-label="Delete bookmark" class='delete js-delete'>
                    <span class="fas fa-times"></span>
                  </button>
                </div>
              </li>`;
    } else {
      return `<li>
                <div class='inList bookmark' id=${obj.id}>
                    <button aria-label="Expand bookmark" class='expand js-expand'><span class="fas fa-caret-right"></span></button>
                    <p class="bookmark-title">${obj.title}</p>
                  ${renderRating(obj)}
                  <button aria-label="Delete bookmark" class='delete js-delete'>
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

  const renderError = function() {
    return `<div class='error'><p>${store.bookmarks.error}</p>
    <button aria-label="Close error message" class='js-close-error'> 
      <span class="fas fa-times"></span>
    </button></div>`;
  };

  // append the bookmark list after the create bookmark item, which always stays at the top of the list
  const render = function() {
    if (store.bookmarks.error) {
      $('main').prepend(renderError());
    } else {
      $('.error').detach();
    }
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
    handleHearts();
    handleCloseError();
  };

  return {
    render,
    bindEventListeners
  };

}());