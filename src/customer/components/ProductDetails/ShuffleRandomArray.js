export const getRandomElements = (array, num) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

