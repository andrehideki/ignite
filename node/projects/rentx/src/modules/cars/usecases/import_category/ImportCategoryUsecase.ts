import fs from "fs";
import { Express } from "express";
import { parse } from "csv-parse";
import { inject, injectable } from "tsyringe";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@errors/AppError";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUsecase {
    
    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRespository) {}

    private async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
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
        for (const { name, description } of categories) {
            const categoryAlreadyExists = !! await this.categoryRepository.findByName(name);
            if (categoryAlreadyExists) {
                throw new AppError(`Category already exists: ${name}`);
            }
            this.categoryRepository.create({
                name,
                description
            });
        }
    }   
}

export { ImportCategoryUsecase };