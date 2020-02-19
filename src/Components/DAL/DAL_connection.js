export const connection = {
    async getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return await data;
    }
};
