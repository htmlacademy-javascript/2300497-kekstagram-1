const isEscapeKey = function(evt) {
    return evt.key === 'Escape';
  };
  
  const isEnterKey = function(evt) {
    return evt.key === 'Enter';
  };
  
  export { isEscapeKey, isEnterKey };
  