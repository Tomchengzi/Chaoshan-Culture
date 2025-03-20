document.addEventListener('DOMContentLoaded', function() {
    // 数字增长动画
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat-item .number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50; // 将动画分为50步
            const duration = 1500; // 1.5秒完成动画
            const stepTime = duration / 50;
            
            function updateNumber() {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.round(current) + '+';
                    setTimeout(updateNumber, stepTime);
                } else {
                    stat.textContent = target + '+';
                }
            }
            
            updateNumber();
        });
    }

    // 表单验证和提交
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // 验证表单
            let isValid = true;
            let errorMessage = '';
            
            // 验证姓名
            if (formData.name.length < 2) {
                isValid = false;
                errorMessage += '姓名至少需要2个字符\n';
            }
            
            // 验证邮箱
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                isValid = false;
                errorMessage += '请输入有效的邮箱地址\n';
            }
            
            // 验证留言内容
            if (formData.message.length < 10) {
                isValid = false;
                errorMessage += '留言内容至少需要10个字符\n';
            }
            
            if (!isValid) {
                alert(errorMessage);
                return;
            }
            
            // 模拟表单提交
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = '提交中...';
            
            // 这里可以添加实际的表单提交代码
            setTimeout(() => {
                alert('感谢您的留言！我们会尽快回复。');
                feedbackForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = '发送留言';
            }, 1500);
        });
    }

    // 监听滚动事件，触发数字动画
    let animated = false;
    function checkScroll() {
        if (animated) return;
        
        const statsSection = document.querySelector('.intro-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.8;
        
        if (rect.top < triggerPoint) {
            animateNumbers();
            animated = true;
            window.removeEventListener('scroll', checkScroll);
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始检查

    // 表单输入动画效果
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // 如果输入框已有内容，添加focused类
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}); 