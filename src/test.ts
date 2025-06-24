import { timer } from "./utilities/Timer";

timer("Test Timer", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    console.log(response);
})