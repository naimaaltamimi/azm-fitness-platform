import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src'), // جذر الواجهة الإدارية
  plugins: [react()],
  base: '/admin/', // المسار الأساسي للوحة الإدارة
  server: {
    port: 5174, // منفذ مخصص للـ admin (يمكن تغييره)
  },
  build: {
    outDir: path.resolve(__dirname, '../../dist/admin'), // مجلد الخروج داخل dist/admin
    rollupOptions: {
      input: path.resolve(__dirname, 'src/pages/Dashboard.tsx'),
    },
  },
});

