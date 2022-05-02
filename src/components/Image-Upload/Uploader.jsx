import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { ref, uploadBytes, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

function Uploader() {
  const firebaseConfig = {
    apiKey: 'AIzaSyBegp0enVMVG-NCtWMGSdxDryhqfSe5kBM',

    authDomain: 'teile-dein-obst.firebaseapp.com',

    projectId: 'teile-dein-obst',

    storageBucket: 'teile-dein-obst.appspot.com',

    messagingSenderId: '767476028882',

    appId: '1:767476028882:web:9d5bb0332aa5302e43e40b',
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const [imageUpload, setImageUpload] = useState([]);

  const uploadImage = (e) => {
    e.preventDefault();
    console.log('uploading');
    // if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${uploadImage.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then(() =>
      console.log('Image uploaded')
    );
  };

  return (
    <div>
      <form>
        <input
          onChange={(event) => setImageUpload(event.target.files[0])}
          type="file"
        ></input>
        <button onClick={(e) => uploadImage(e)}>Upload Image</button>
      </form>
    </div>
  );
}

export default Uploader;
