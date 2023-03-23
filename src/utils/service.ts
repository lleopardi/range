export const getFilter = (path: string) => {
    const api = "https://6417d515cc5fd8ffb1779868.mockapi.io/";
    return fetch(`${api}${path}`).then((response) => response.json());
};

