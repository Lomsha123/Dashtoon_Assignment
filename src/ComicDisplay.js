import React from 'react';

const ComicDisplay = ({ images }) => {
    console.log(images, 'images');
  return (
    <div>
        <div>
          <img src={{uri:images}} />
        </div>
    </div>
  );
};

export default ComicDisplay;
