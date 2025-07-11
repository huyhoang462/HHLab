// Tạo một số ngẫu nhiên từ 1 đến 100 để đảm bảo mỗi lần gọi là một trang khác nhau
const randomPage = Math.floor(Math.random() * 100) + 1;

// Endpoint mới để lấy thông tin của 1 ảnh ngẫu nhiên
export const HOME_API = `https://picsum.photos/v2/list?page=${randomPage}&limit=1`;
