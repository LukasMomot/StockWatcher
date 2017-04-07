import { Greeter } from "./src/greeter";

const greeter = new Greeter("Lukas");

const msg: string = greeter.greet();

console.log("Server Started...");
console.log(`Hello ${msg}`);

