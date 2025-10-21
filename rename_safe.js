// rename_colon.js
// 自动扫描当前文件夹下所有文件和目录，
// 将名称中包含 ":" 的地方替换为 "--"

import fs from "fs";
import path from "path";

const targetDir = process.cwd(); // 获取当前执行目录
// 定义需要替换的非法字符
// 包含 Windows 禁止的字符：<>:"/\|?* 和中文冒号（：）
const invalidCharsRegex = /[<>:"/\\|?*：？]/g;
const replacement = "";

function renameFilesRecursively(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const oldPath = path.join(dir, entry.name);

    // 先递归子目录（防止路径被先改名后找不到）
    if (entry.isDirectory()) {
      renameFilesRecursively(oldPath);
    }

    // 检查文件名是否包含非法字符
    if (invalidCharsRegex.test(entry.name)) {
      const newName = entry.name.replace(invalidCharsRegex, replacement);
      const newPath = path.join(dir, newName);

      try {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ 已重命名：${oldPath} -> ${newPath}`);
      } catch (err) {
        console.error(`❌ 重命名失败：${oldPath}`, err.message);
      }
    }
  }
}

console.log(`🚀 开始处理目录：${targetDir}`);
renameFilesRecursively(targetDir);
console.log("🎉 全部非法字符已清理完成！");
