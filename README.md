# expense-tracker

## 功能
1. 可以註冊、登入、登出
2. 可以新增、刪除、修改、查看支出資料
3. 可以依照類別查看支出資料

## 技術
1. express
2. mongoose
3. express-session
4. passport.js
5. handlebars

## 專案安裝

1. 將此專案 clone 至本機  
   `git clone https://github.com/art787472/expense-tracker.git`
2. 進入存放專案的資料夾  
   `cd expense-tracker`
3. 安裝 npm 套件  
   `npm install`
4. 在目錄中建立 .env 檔案，根據 .env.example 格式，將相關資訊填入。 
5. 生成種子資料在終端機輸入  
   `npm run seed` 
   SEED_USER 資料：
   email: user@example.com
   password: 12345678
6. 終端機輸入 npm run dev
   `npm run dev`

7. 依照 terminal 上的指示在瀏覽器輸入 http://localhost:[你的port]
    port 預設值為 3000
