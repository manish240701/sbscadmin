//dependencies
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../Firebase";

export default function UseImages(imageSources) {
  //states
  const [images, setImages] = useState({});

  //getimagehandler
  async function getImage(url) {
    const imageUrl = await getDownloadURL(ref(storage, url));
    return { url, imageUrl };
  }

  useEffect(() => {
    const promises = [];
    const newImages = { ...images };
    imageSources.forEach((src) => {
      if (newImages[src]) return;
      newImages[src] = "loading";
      promises.push(getImage(src));
      console.log(src);
    });
    if (promises.length === 0) return;
    Promise.allSettled(Object.values(promises))
      .then((data) => {
        console.log(data);
        const newImages = { ...images };
        data.forEach((img) => {
          if (img.status === "fulfilled")
            newImages[img.value.url] = img.value.imageUrl;
          else newImages[img.url] = -1;
        });
        setImages(newImages);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [imageSources]);

  return images;
}
