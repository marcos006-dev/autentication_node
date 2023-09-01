import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';
import User from "../models/User.js";
export const dbseed = async () => {
    try {
        await User.create({
            name: "Admin",
            email: "admin@admin.com",
            password: await bcrypt.hash("admin", 10),
        });
        console.log("Se ha creado el usuario Admin");

        // create 10 users
        for (let i = 0; i < 10; i++) {
            await User.create({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: await bcrypt.hash("123456", 10),
            });
        }
    } catch (error) {
        console.error(error);
    }
};