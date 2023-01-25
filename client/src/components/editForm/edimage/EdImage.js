import React, { useState } from 'react';

export function EdImage({ image, delate }) {
  const [unmount, setUnmount] = useState(false);
  return !unmount ? (
    <>
      <img
        style={{ width: '150px' }}
        src={image.fileUrl}
        alt="editble"
      />
      <button
        onClick={(e) => {
          delate(image.fileName);
          setUnmount(true);
        }}
      >
        delate
      </button>
    </>
  ) : (
    ''
  );
}
