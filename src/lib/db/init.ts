import { mkdirSync } from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/images/products");
mkdirSync(uploadDir, { recursive: true });