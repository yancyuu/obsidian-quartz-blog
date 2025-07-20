// 加强版防复制JavaScript
// 文件：quartz/components/scripts/anti-copy-strong.inline.ts

(function() {
  'use strict';
  
  console.log('🚫 防复制脚本已加载');
  
  // === 配置 ===
  const config = {
    showAlert: true,
    alertMessage: "内容受版权保护，禁止复制！",
    blockRightClick: true,
    blockKeyboard: true,
    blockSelection: true,
    clearClipboard: true
  };

  // === 防止右键菜单 ===
  if (config.blockRightClick) {
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (config.showAlert) {
        showCustomAlert(config.alertMessage);
      }
      return false;
    }, true);
    
    // 移动端长按
    document.addEventListener('touchstart', function(e) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
    
    document.addEventListener('touchend', function(e) {
      if (e.touches.length > 0) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // === 防止键盘快捷键 ===
  if (config.blockKeyboard) {
    document.addEventListener('keydown', function(e) {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const alt = e.altKey;
      
      // 检查是否在输入框中
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || 
                     target.tagName === 'TEXTAREA' ||
                     target.getAttribute('contenteditable') === 'true';
      
      // 如果在搜索框中，允许基本操作
      if (isInput && (target.classList.contains('search') || target.id.includes('search'))) {
        return true;
      }
      
      // 禁用的快捷键
      const forbiddenCombos = [
        // 复制粘贴
        { ctrl: true, key: 'c' },    // Ctrl+C
        { ctrl: true, key: 'a' },    // Ctrl+A
        { ctrl: true, key: 'x' },    // Ctrl+X
        { ctrl: true, key: 'v' },    // Ctrl+V
        { ctrl: true, key: 's' },    // Ctrl+S
        { ctrl: true, key: 'p' },    // Ctrl+P
        
        // 开发者工具
        { key: 'f12' },              // F12
        { ctrl: true, shift: true, key: 'i' }, // Ctrl+Shift+I
        { ctrl: true, shift: true, key: 'j' }, // Ctrl+Shift+J
        { ctrl: true, shift: true, key: 'c' }, // Ctrl+Shift+C
        { ctrl: true, key: 'u' },    // Ctrl+U
        
        // 其他
        { key: 'f5' },               // F5
        { ctrl: true, key: 'r' },    // Ctrl+R
        { ctrl: true, key: 'h' },    // Ctrl+H
        { ctrl: true, key: 'f' },    // Ctrl+F (如果你想禁用搜索)
      ];
      
      // 检查是否匹配禁用组合
      for (const combo of forbiddenCombos) {
        const matchCtrl = combo.ctrl ? ctrl : !ctrl;
        const matchShift = combo.shift ? shift : !combo.shift;
        const matchAlt = combo.alt ? alt : !combo.alt;
        const matchKey = combo.key === key;
        
        if (matchCtrl && matchShift && matchAlt && matchKey) {
          e.preventDefault();
          e.stopPropagation();
          if (config.showAlert) {
            showCustomAlert(config.alertMessage);
          }
          return false;
        }
      }
    }, true);
  }

  // === 防止文本选择 ===
  if (config.blockSelection) {
    // 禁用选择开始
    document.addEventListener('selectstart', function(e) {
      const target = e.target as HTMLElement;
      
      // 允许输入框选择
      if (target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' ||
          target.classList.contains('search')) {
        return true;
      }
      
      e.preventDefault();
      return false;
    }, true);

    // 禁用鼠标选择
    document.addEventListener('mousedown', function(e) {
      if (e.detail > 1) { // 多次点击
        e.preventDefault();
        return false;
      }
    }, true);

    // 禁用拖拽选择
    document.addEventListener('mousemove', function(e) {
      if (e.buttons === 1) { // 左键按下拖拽
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          return false;
        }
      }
    }, true);
  }

  // === 清除剪贴板 ===
  if (config.clearClipboard) {
    // 监听复制事件
    document.addEventListener('copy', function(e) {
      e.clipboardData?.setData('text/plain', '内容受版权保护 - 禁止复制');
      e.preventDefault();
      if (config.showAlert) {
        showCustomAlert("检测到复制操作，已阻止！");
      }
    }, true);

    // 定期清除剪贴板
    setInterval(() => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('');
        }
      } catch (err) {
        // 忽略错误
      }
    }, 2000);
  }

  // === 检测开发者工具 ===
  let devtools = { open: false };
  const threshold = 160;
  
  setInterval(function() {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtools.open) {
        devtools.open = true;
        if (config.showAlert) {
          showCustomAlert("检测到开发者工具，请关闭！");
          // 不关闭页面，只是警告
        }
      }
    } else {
      devtools.open = false;
    }
  }, 1000);

  // === 自定义提示框 ===
  function showCustomAlert(message: string) {
    // 移除之前的提示
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
      existingAlert.remove();
    }
    
    // 创建新提示
    const alert = document.createElement('div');
    alert.className = 'custom-alert';
    alert.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ff4444, #cc0000);
      color: white;
      padding: 20px 30px;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.4);
      z-index: 999999;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      max-width: 300px;
      border: 2px solid #ff6666;
      animation: alertShake 0.5s ease-in-out;
    `;
    
    alert.innerHTML = `
      <div style="font-size: 24px; margin-bottom: 10px;">🚫</div>
      <div>${message}</div>
    `;
    
    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes alertShake {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        25% { transform: translate(-50%, -50%) scale(1.05) rotate(1deg); }
        75% { transform: translate(-50%, -50%) scale(1.05) rotate(-1deg); }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alert);
    
    // 3秒后移除
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert);
      }
    }, 3000);
  }

  // === 页面加载完成后的处理 ===
  document.addEventListener('DOMContentLoaded', function() {
    // 清除任何现有选择
    if (window.getSelection) {
      window.getSelection()?.removeAllRanges();
    }
    
    // 添加CSS样式（以防CSS文件未加载）
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      
      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      
      img, svg {
        -webkit-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
      
      ::selection { background: transparent !important; }
      ::-moz-selection { background: transparent !important; }
    `;
    document.head.appendChild(style);
    
    console.log('🛡️ 防复制保护已激活');
  });

  // === 控制台警告 ===
  console.clear();
  console.log('%c⚠️ 警告', 'color: red; font-size: 30px; font-weight: bold;');
  console.log('%c网站内容受版权保护！', 'color: red; font-size: 16px;');
  console.log('%c禁止复制、下载或以其他方式获取内容！', 'color: red; font-size: 14px;');

  // === 禁用右键和选择的额外措施 ===
  ['contextmenu', 'selectstart', 'dragstart'].forEach(event => {
    document.addEventListener(event, function(e) {
      e.preventDefault();
      return false;
    }, true);
  });

})();
