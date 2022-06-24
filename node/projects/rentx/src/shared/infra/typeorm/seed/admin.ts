import { createDataSource } from "../index";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";
import { User } from "@shared/infra/typeorm/entities/User";

async function create() {
    const id = uuidV4();
    const password = await hash("admin", 8);
    const usersRepository = (await createDataSource()).getRepository(User);
    const user = usersRepository.create({
        id,
        name: "admin",
        driver_license: "admin",
        password,
        email: "admin@rentx.com.br",
        created_at: new Date()
    });
    usersRepository.save(user);
}


create()
    .then(() => console.log("user admin created"))
    .catch(err=> console.log(err));
