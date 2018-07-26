'use strict';

/* global $ store*/

const bookmarkList = (function() {
  // need event handlers for everything the user can click on in the dom

  // event handler for the drop down filter menu

  // event handler for the create element button (set on the create button itself)

  // event handler for the submit on the create element form

  // event handler for the delete element button (set on the x button that is a part of the form)

  // event handler for the expand bookmark feature (set on the ul)
  const renderBookmark = function(obj) {
    return `
    <li>
      <div class='inList bookmark'>${obj.name}</div>
    </li>
    `;
  };

  const renderList = function() {
    const htmlArray = store.bookmarks.map(element => renderBookmark(element));
    return htmlArray.join('');
  };


  const render = function() {
    console.log(renderList());
  };

  return {
    render
  };

}());