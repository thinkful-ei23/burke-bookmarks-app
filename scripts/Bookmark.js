'use strict';
 
const bookmark = (function() {

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