'use strict';
 
const Bookmark = (function() {

  const create = function(title, url, description, rating) {
    return {
      title: title,
      url : url, 
      desc : description,
      rating : rating, 
      expanded : false
    };
  };



  return {
    create
  };


}());