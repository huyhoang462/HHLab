const randomPage = Math.floor(Math.random() * 100) + 1;

export const HOME_API = `https://picsum.photos/v2/list?page=${randomPage}&limit=1`;
