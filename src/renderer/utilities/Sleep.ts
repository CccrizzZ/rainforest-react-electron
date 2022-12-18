// the sleep function
const Sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default Sleep;
