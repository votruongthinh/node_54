import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL;
//kiểm tra biến môi trường DATABASE_URL đã được load chưa
console.log(
    "\n",
    {
        DATABASE_URL: DATABASE_URL,
    },
    "\n",
);
