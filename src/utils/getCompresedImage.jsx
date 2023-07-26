import imageCompression from "browser-image-compression";

const getCompressedImage = async (file) => {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.058,
      maxIteration: 30,
    });

    return compressedFile;
  } catch (error) {
    throw error;
  }
};

export default getCompressedImage;
