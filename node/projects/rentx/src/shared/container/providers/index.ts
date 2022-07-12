import { container } from "tsyringe";
import { IDateProvider } from "./date_provider/IDateProvider";
import { DayjsDateProvider } from "./date_provider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayjsDateProvider
);