import sequelize from "sequelize";
import { UserAttributes, Users } from "../models/Users.model";
import inquirer from "inquirer";
import bcrypt from "bcrypt";

async function main() {
    const newUserInfo = await inquirer.prompt<UserAttributes>([
        {
            type: "input",
            name: "username",
            message: "Enter username:",
        },
        {
            type: "input",
            name: "password",
            message: "Enter password:",
        },
        {
            type: "list",
            name: "role",
            message: "Select Role:",
            choices: [
                "admin",
                "operator"
            ]
        },
        {
            type: "input",
            name: "firstname",
            message: "Enter firstname:"
        },
        {
            type: "input",
            name: "lastname",
            message: "Enter lastname:"
        }
    ])

    const duplicateUser = await Users.findOne({
        where: {
            username: newUserInfo.username
        }
    })

    if (duplicateUser) {
        console.log(`Error: username ${newUserInfo.username} already exists.`)
        return;
    }

    console.log(`Creating user ${newUserInfo.username}!`);

    const salt = await bcrypt.genSalt();
    newUserInfo.password = await bcrypt.hash(newUserInfo.password, salt);

    await Users.create(newUserInfo);

    console.log("Success!")
}

main();