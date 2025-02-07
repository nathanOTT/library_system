import { hash } from "bcrypt";

const password = "password";

const hashedPassword = await hash(password, 10);
if (!hashedPassword) {
  console.log("Error: Password hashing failed");
}

console.log("Hashed password:", hashedPassword);