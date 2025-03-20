document.addEventListener('DOMContentLoaded', function() {
    // 标签切换功能
    initTabSwitching();
    
    // 初始化所有轮播图
    initAllSliders();
    
    // 返回顶部按钮功能
    initBackToTop();
    
    // 详情按钮点击效果
    initDetailButtons();
});

// 标签切换功能
function initTabSwitching() {
    const tabs = document.querySelectorAll('.guide-tab');
    const contents = document.querySelectorAll('.guide-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有标签的激活状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前标签的激活状态
            tab.classList.add('active');
            
            // 隐藏所有内容
            contents.forEach(content => content.classList.remove('active'));
            
            // 显示对应内容
            const targetId = tab.getAttribute('data-guide');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 初始化所有轮播图
function initAllSliders() {
    const sliders = document.querySelectorAll('.spot-slider');
    
    sliders.forEach(slider => {
        initSlider(slider);
    });
}

// 单个轮播图初始化
function initSlider(slider) {
    const slides = slider.querySelectorAll('img');
    const prevBtn = slider.querySelector('.slide-prev');
    const nextBtn = slider.querySelector('.slide-next');
    const indicator = slider.querySelector('.slide-indicator');
    
    let currentIndex = 0;
    let slideInterval;
    
    // 更新指示器文本
    function updateIndicator() {
        indicator.textContent = `${currentIndex + 1}/${slides.length}`;
    }
    
    // 初始化
    slides[0].classList.add('active-slide');
    updateIndicator();
    
    // 上一张按钮
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetInterval();
    });
    
    // 下一张按钮
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetInterval();
    });
    
    // 自动轮播
    startInterval();
    
    // 鼠标悬停暂停轮播
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // 鼠标离开继续轮播
    slider.addEventListener('mouseleave', () => {
        startInterval();
    });
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        // 处理边界情况
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        // 移除所有幻灯片的活动类
        slides.forEach(slide => slide.classList.remove('active-slide'));
        
        // 激活当前幻灯片
        slides[index].classList.add('active-slide');
        
        // 更新当前索引
        currentIndex = index;
        
        // 更新指示器
        updateIndicator();
    }
    
    // 开始自动轮播
    function startInterval() {
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }
    
    // 重置轮播计时器
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
}

// 返回顶部按钮功能
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // 滚动超过300px显示按钮
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 平滑滚动
        });
    });
}

// 详情按钮点击效果
function initDetailButtons() {
    const detailButtons = document.querySelectorAll('.btn-details');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取当前景点卡片
            const spotCard = this.closest('.spot-card');
            const spotName = spotCard.querySelector('h3').textContent;
            
            // 这里可以实现点击后的行为，例如：
            // 1. 显示模态框 
            // 2. 跳转到详情页面
            // 3. 展开更多内容
            
            // 示例：弹出一个提示（实际项目中可替换为更详细的功能）
            alert(`您想了解更多关于"${spotName}"的信息。此功能正在完善中，敬请期待！`);
        });
    });
} 