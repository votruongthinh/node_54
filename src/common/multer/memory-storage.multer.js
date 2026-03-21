import multer from "multer";

const storage = multer.memoryStorage();

export const uploadMemoryStorage = multer({
  storage: storage,
  limits: 5 * 1024 * 1024,
});
