import fs from "fs";
import path from "path";

export const saveFile = (file: Express.Multer.File, folder: string): string => {
  if (!file) throw new Error("File is required");

  const uploadsDir = path.join(process.cwd(), folder);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filename = Date.now() + "-" + file.originalname;
  const fullPath = path.join(uploadsDir, filename);

  fs.writeFileSync(fullPath, file.buffer);

  return path.join(folder, filename).replace(/\\/g, "/"); 
};

export const deleteFile = (filePath: string) => {
  if (!filePath) return;
  const fullPath = path.join(process.cwd(), filePath);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};
