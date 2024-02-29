import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: "http://localhost:3000",
  },
  // server: {
  //   port: 3000, // Thay đổi port thành số cổng bạn muốn sử dụng
  //   host: "0.0.0.0", // Thay đổi host nếu cần thiết
  // },
  
});