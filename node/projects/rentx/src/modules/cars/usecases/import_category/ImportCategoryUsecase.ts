import fs from "fs";
import { Express } from "express";
import { parse } from "csv-parse";
import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUsecase {
    
    constructor(private categoryRepository: ICategoriesRespository) {}

    private loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];
            const parseFile = parse();
            stream.pipe(parseFile);
            parseFile.on("data", async line => {
                const [name, description] = line;
                categories.push({ name, description });
            })
            .on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            })
            .on("error", err => reject(err));
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(({ name, description }) => {
            const categoryAlreadyExists = !!this.categoryRepository.findByName(name);
            if (categoryAlreadyExists) {
                throw new Error("Category already exists ");
            }
            this.categoryRepository.create({
                name,
                description
            });
        });
    }
}

export { ImportCategoryUsecase };