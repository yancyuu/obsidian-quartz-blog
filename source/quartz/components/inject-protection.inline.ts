// 文件：quartz/components/scripts/inject-protection.inline.ts
// 这个方法不依赖CSS文件，直接注入到页面

document.addEventListener('DOMContentLoaded', function() {
  console.log('🛡️ 开始注入防复制保护...');
  
  // === 注入CSS样式 ===
  const cssStyles = `
    /* 防复制核心样式 */
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
      -webkit-tap-highlight-color: transparent !important;
    }
    
    /* 保留必要交互 */
    input[type="text"],
    input[type="search"], 
    textarea,
    [contenteditable="true"],
    .search-container input,
    .search-bar,
    #search-input {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
      pointer-events: auto !important;
    }
    
    /* 禁用图片拖拽 */
    img, svg, figure {
      -webkit-user-drag: none !important;
      -khtml-user-drag: none !important;
      -moz-user-drag: none !important;
      -o-user-drag: none !important;
      user-drag: none !important;
      pointer-events: none !important;
    }
    
    /* 清除选择高亮 */
    ::selection {
      background: transparent !important;
      color: inherit !important;
    }
    
    ::-moz-selection {
      background: transparent !important;
      color: inherit !important;
    }
    
    /* 状态指示器 */
    body::before {
      content: "🔒 内容已保护";
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(255, 68, 68, 0.9);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-family: monospace;
      z-index: 999999;
      pointer-events: none;
      opacity: 0.7;
    }
  `;
  
  // 创建并插入style标签
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerHTML = cssStyles;
  document.head.appendChild(styleSheet);
  
  console.log('✅ CSS样式已注入');
  
  // === 添加事件监听器 ===
  
  // 1. 禁用右键菜单
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    e.stopPropagation();
    showWarning('右键功能已禁用');
    return false;
  }, true);
  
  // 2. 禁用键盘快捷键
  document.addEventListener('keydown', function(e) {
    const key = e.key.toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;
    const shift = e.shiftKey;
    
    // 检查是否在搜索框内
    const target = e.target as HTMLElement;
    const isSearchInput = target.tagName === 'INPUT' && 
      (target.type === 'search' || target.type === 'text' || 
       target.classList.contains('search') || 
       target.id.includes('search'));
    
    // 在搜索框内时允许基本操作
    if (isSearchInput && (key === 'c' || key === 'v' || key === 'a')) {
      return true;
    }
    
    // 禁用的快捷键组合
    const forbidden = [
      { ctrl: true, key: 'c' },    // 复制
      { ctrl: true, key: 'a' },    // 全选
      { ctrl: true, key: 'x' },    // 剪切
      { ctrl: true, key: 'v' },    // 粘贴
      { ctrl: true, key: 's' },    // 保存
      { ctrl: true, key: 'p' },    // 打印
      { ctrl: true, key: 'u' },    // 查看源码
      { key: 'f12' },              // 开发者工具
      { ctrl: true, shift: true, key: 'i' }, // 审查元素
      { ctrl: true, shift: true, key: 'j' }, // 控制台
      { ctrl: true, shift: true, key: 'c' }, // 选择器
    ];
    
    for (const combo of forbidden) {
      if (combo.ctrl === ctrl && combo.shift === shift && combo.key === key) {
        e.preventDefault();
        e.stopPropagation();
        showWarning('该操作已被禁用');
        return false;
      }
    }
  }, true);
  
  // 3. 禁用文本选择
  document.addEventListener('selectstart', function(e) {
    const target = e.target as HTMLElement;
    
    // 允许输入框选择
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return true;
    }
    
    e.preventDefault();
    return false;
  }, true);
  
  // 4. 禁用拖拽
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  }, true);
  
  // 5. 监听复制事件
  document.addEventListener('copy', function(e) {
    e.clipboardData?.setData('text/plain', '此内容受版权保护，请勿复制 - ' + window.location.href);
    e.preventDefault();
    showWarning('复制已被阻止');
  }, true);
  
  // === 工具函数 ===
  function showWarning(message: string) {
    // 移除之前的警告
    const existingWarning = document.querySelector('.copy-warning');
    if (existingWarning) {
      existingWarning.remove();
    }
    
    // 创建新警告
    const warning = document.createElement('div');
    warning.className = 'copy-warning';
    warning.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ff4444, #cc0000);
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: bold;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 1000000;
      text-align: center;
      border: 2px solid #ff6666;
    `;
    warning.textContent = message;
    
    document.body.appendChild(warning);
    
    // 2.5秒后移除
    setTimeout(() => {
      if (warning.parentNode) {
        warning.parentNode.removeChild(warning);
      }
    }, 2500);
  }
  
  // === 页面保护完成 ===
  console.log('🔒 页面保护已激活');
  
  // 清除任何现有选择
  setTimeout(() => {
    if (window.getSelection) {
      window.getSelection()?.removeAllRanges();
    }
  }, 100);
});
