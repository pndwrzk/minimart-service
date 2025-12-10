import fs from "fs";
import path from "path";
import { saveFile, deleteFile } from "../../src/utils/file-upload"; 

jest.mock("fs");

describe("File Utils - upload & delete flow", () => {
  const fileMock = {
    originalname: "product-test.jpg",
    buffer: Buffer.from("dummy content"),
  } as Express.Multer.File;

  const folder = "uploads/products";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save file and then delete it", () => {
   
    (fs.existsSync as jest.Mock).mockReturnValue(false); 
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    (fs.unlinkSync as jest.Mock).mockImplementation(() => {});
    const savedPath = saveFile(fileMock, folder);
    expect(fs.existsSync).toHaveBeenCalledWith(path.join(process.cwd(), folder));
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(process.cwd(), folder), { recursive: true });
    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(savedPath).toMatch(/uploads\/products\/\d+-product-test.jpg/);

    
    (fs.existsSync as jest.Mock).mockReturnValue(true); 
    deleteFile(savedPath);
    expect(fs.existsSync).toHaveBeenCalledWith(path.join(process.cwd(), savedPath));
    expect(fs.unlinkSync).toHaveBeenCalledWith(path.join(process.cwd(), savedPath));
  });
});
