// Toast notification system
function showToast(message, type) {
    // Remove any existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const colors = {
        success: { bg: '#22c55e', icon: '🛒' },
        error: { bg: '#ef4444', icon: '❌' },
        warning: { bg: '#f59e0b', icon: '👨‍🍳' },
        info: { bg: '#3b82f6', icon: '📢' },
        neutral: { bg: '#6b7280', icon: '💬' }
    };

    const style = colors[type] || colors.neutral;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${style.icon}</span><span>${message}</span>`;

    toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${style.bg};
    color: white;
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    font-family: Inter, sans-serif;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    white-space: nowrap;
  `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(function () {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Animate out after 3 seconds
    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
}