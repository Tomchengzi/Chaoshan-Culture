// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏汉堡菜单
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // 创建菜单背景遮罩
    const backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    document.body.appendChild(backdrop);
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            backdrop.classList.toggle('active');
            
            // 当菜单打开时禁止页面滚动
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // 点击背景遮罩关闭菜单
        backdrop.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            backdrop.classList.remove('active');
            body.style.overflow = '';
        });
    }
    
    // 点击导航链接时关闭菜单
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                backdrop.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });
    
    // 轮播图功能
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    // 初始化轮播图
    function initSlider() {
        if (slides.length === 0) return;
        
        // 设置自动轮播
        startSlideInterval();
        
        // 点击上一张按钮
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                changeSlide(currentSlide - 1);
                startSlideInterval();
            });
        }
        
        // 点击下一张按钮
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                changeSlide(currentSlide + 1);
                startSlideInterval();
            });
        }
        
        // 点击指示点
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                clearInterval(slideInterval);
                const slideIndex = parseInt(this.getAttribute('data-index'));
                changeSlide(slideIndex);
                startSlideInterval();
            });
        });
    }
    
    // 切换轮播图
    function changeSlide(index) {
        // 处理索引边界
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        // 移除当前活动状态
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // 设置新的活动状态
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // 开始自动轮播
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            changeSlide(currentSlide + 1);
        }, 5000); // 5秒切换一次
    }
    
    // 初始化轮播图
    initSlider();
    
    // 滚动动画效果
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .intro-content, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // 添加滚动监听
    window.addEventListener('scroll', animateOnScroll);
    // 初始检查
    animateOnScroll();

    // 控制返回顶部按钮显示
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const topBtn = document.querySelector('.float-btn.top');
        
        if (topBtn) {
            if (scrollTop > 300) {
                topBtn.classList.add('visible');
            } else {
                topBtn.classList.remove('visible');
            }
        }
    }

    // 返回顶部功能
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 返回顶部按钮点击事件
    const topBtn = document.querySelector('.float-btn.top');
    if (topBtn) {
        topBtn.addEventListener('click', scrollToTop);
    }

    // 监听滚动事件
    window.addEventListener('scroll', handleScroll);

    // 导航栏滚动效果
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 检查初始滚动位置
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
});

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
}); 