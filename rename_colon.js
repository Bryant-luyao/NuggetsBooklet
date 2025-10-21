// rename_colon.js
// 自动扫描当前文件夹下所有文件和目录，
// 将名称中包含 ":" 的地方替换为 "--"

import fs from "fs";
import path from "path";

const targetDir = process.cwd(); // 获取当前执行目录

function renameFilesRecursively(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const oldPath = path.join(dir, entry.name);

    // 如果是目录，递归处理
    if (entry.isDirectory()) {
      renameFilesRecursively(oldPath);
    }

    // 检查是否包含中英文冒号
    if (/[：:]/.test(entry.name)) {
        const newName = entry.name.replace(/[：:]/g, "--");
        const newPath = path.join(dir, newName);

        try {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ 已重命名：${oldPath} -> ${newPath}`);
        } catch (err) {
        console.error(`❌ 重命名失败：${oldPath}`, err);
        }
    }
  }
}

console.log(`🚀 开始处理目录：${targetDir}`);
renameFilesRecursively(targetDir);
console.log("🎉 全部处理完成！");
