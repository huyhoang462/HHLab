import axios from "axios";
//import { HOME_API } from "../constants/api";

// 1. Định nghĩa kiểu dữ liệu cho một ảnh từ Picsum
// Dựa trên cấu trúc trả về của API
interface PicsumPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string; // URL trang web của ảnh
  download_url: string; // URL để tải ảnh, chúng ta sẽ dùng cái này!
}

// 2. Sửa lại hàm getHomeData
export const getHomeData = async (): Promise<PicsumPhoto> => {
  // Tạo một số ngẫu nhiên mỗi khi hàm được gọi để đảm bảo tính ngẫu nhiên cao nhất
  const randomPage = Math.floor(Math.random() * 200) + 1;
  const apiUrl = `https://picsum.photos/v2/list?page=${randomPage}&limit=1`;

  // Gọi đến API mới
  const response = await axios.get<PicsumPhoto[]>(apiUrl); // API trả về một mảng

  // API trả về một mảng chứa 1 phần tử, nên ta lấy phần tử đầu tiên
  // Thêm kiểm tra để đảm bảo mảng không rỗng
  if (response.data && response.data.length > 0) {
    return response.data[0];
  }

  // Nếu không có dữ liệu, ném lỗi để React Query bắt
  throw new Error("No image data received from Picsum API");
};
