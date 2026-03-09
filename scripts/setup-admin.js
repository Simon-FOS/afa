import fs from "fs";
import bcrypt from "bcryptjs";
import inquirer from "inquirer";
import dotenv from "dotenv";

dotenv.config();

const ENV_FILE = ".env";

function loadEnv() {
    if (!fs.existsSync(ENV_FILE)) return {};
    const content = fs.readFileSync(ENV_FILE, "utf8");

    const lines = content.split("\n");
    const env = {};

    for (const line of lines) {
        if (!line || line.startsWith("#")) continue;

        const [key, ...valueParts] = line.split("=");
        env[key] = valueParts.join("=");
    }

    return env;
}

function writeEnv(env) {
    const adminBlock = `
#USER ADMIN
USER_ADMIN_NAME=${env.USER_ADMIN_NAME}
USER_ADMIN_USERNAME=${env.USER_ADMIN_USERNAME}
USER_ADMIN_EMAIL=${env.USER_ADMIN_EMAIL}
USER_ADMIN_PASSWORD=${env.USER_ADMIN_PASSWORD}
`;

    let existing = "";

    if (fs.existsSync(ENV_FILE)) {
        existing = fs.readFileSync(ENV_FILE, "utf8");

        // remove old admin block if it exists
        existing = existing.replace(/#USER ADMIN[\s\S]*?(?=\n#|$)/g, "").trim();
    }

    const newContent = `${existing}\n${adminBlock}\n`.trim() + "\n";

    fs.writeFileSync(ENV_FILE, newContent);
}

async function setupAdmin() {
    console.log("\n=== Admin Setup ===\n");

    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Admin Name:"
        },
        {
            type: "input",
            name: "username",
            message: "Admin Username:"
        },
        {
            type: "input",
            name: "email",
            message: "Admin Email:"
        },
        {
            type: "password",
            name: "password",
            message: "Admin Password:",
            mask: "*"
        }
    ]);

    const hashedPassword = await bcrypt.hash(answers.password, 10);

    const env = loadEnv();

    env.USER_ADMIN_NAME = answers.name;
    env.USER_ADMIN_USERNAME = answers.username;
    env.USER_ADMIN_EMAIL = answers.email;
    env.USER_ADMIN_PASSWORD = hashedPassword;

    writeEnv(env);

    console.log("\n✅ Admin credentials saved to .env\n");
}

setupAdmin();