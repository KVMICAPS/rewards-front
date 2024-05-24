import {
  generateStickerWithAI,
  saveSticker,
  getStickers,
  saveStickerByFile,
  save3DObjectByFile,
  get3DObjects,
  getFile,
  assignRewardToKits,
  saveProduct,
  getProductsImages,
  deleteRewardsByRewardId
} from "../models/rewardModel.js";

const generateStickerWithAIController = async (prompt, userID) => {
  try {
    const generatedSticker = await generateStickerWithAI(prompt, userID);

    if (!generatedSticker) {
      console.error("Error generating Sticker with AI controller.");
      return false;
    }

    return generatedSticker;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const saveStickerController = async (stickerData) => {
  try {
    const res = await saveSticker(stickerData);

    if (!res) {
      console.error("Error saving sticker in Controller.");
      return {status: false};
    }
    return {status: true, response: res};
  } catch (error) {
    console.error(error);
    return false;
  }
};

const saveStickerByFileController = async (stickerData) => {
  try {
    const res = await saveStickerByFile(stickerData);

    if (!res) {
      console.error("Error saving sticker in Controller.");
      return {status: false};
    }
    return {status: true, response: res};
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getStickersController = async () => {
  try {
    const images = await getStickers();

    if (!images) {
      console.error("Error getting sticker images");
      return false;
    }

    return images;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const save3DObjectByFileController = async (objectData) => {
  try {
    const res = await save3DObjectByFile(objectData);

    if (!res) {
      console.error("Error saving 3D object in Controller.");
      return false;
    }
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const get3DObjectsController = async () => {
  try {
    const threeDObjects = await get3DObjects();

    if (!threeDObjects) {
      console.error("Error getting 3D Objects");
      return false;
    }

    return threeDObjects;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getFileController = async (fileData) => {
  try {
    const file = await getFile(fileData);

    if (!file) {
      console.error("Error getting file in controller");
      return false;
    }

    return file;
  } catch (error) {
    console.error(error);
    return false;
  }
};


const assignRewardToKitsController = async (data) => {
  try {
    const res = await assignRewardToKits(data);

    if (!res) {
      console.error("Error assigning reward to kits.");
      return {status: false};
    }
    return {status: true, response: res};
  } catch (error) {
    console.error(error);
    return {status: false};
  }
};

const saveProductController = async (objectData) => {
  try {
    const res = await saveProduct(objectData);

    if (!res) {
      console.error("Error creating product in Controller.");
      return false;
    } 
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getProductsImagesController = async () => {
  try {
    const images = await getProductsImages();

    if (!images) {
      console.error("Error getting product images");
      return false;
    }

    return images;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteRewardsByRewardIdController = async (data) => {
  try {
    const response = await deleteRewardsByRewardId(data);
    console.log("response in deleteRewardsByRewardIdController: ", response);
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {
  generateStickerWithAIController,
  saveStickerController,
  getStickersController,
  saveStickerByFileController,
  save3DObjectByFileController, 
  get3DObjectsController,
  getFileController,
  assignRewardToKitsController,
  saveProductController,
  getProductsImagesController,
  deleteRewardsByRewardIdController
};