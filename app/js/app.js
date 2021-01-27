document.addEventListener('DOMContentLoaded', () => {
    const headerBottom =  document.querySelector('.header__bottom');
    const menuBtn =  document.querySelector('.header__menu-btn');
    const menu =  document.querySelector('.menu');
    const overlay =  document.querySelector('.overlay');
    const html =  document.querySelector('html');
    const menuList = document.querySelectorAll('.menu__list');

    function initMenu() {
        menuBtn.addEventListener('click', openMenu);
    
        document.body.addEventListener('click', function(e) {
            if (!e.target.closest('.header')) {
                closeMenu();
            }
        })

        toggleMenuList();

        function openMenu() {
            menu.classList.add('open');
            overlay.classList.add('active');
            html.classList.add('overflow-hidden');
        }
    
        function closeMenu() {
            menu.classList.remove('open');
            overlay.classList.remove('active');
            html.classList.remove('overflow-hidden'); 
            menuList.forEach(menu => {
                menu.classList.remove('open');
            })
        }
        
        function toggleMenuList() {
            menuList.forEach(menu => {
                menu.addEventListener('click', function(e) {
                    menu.classList.toggle('open');
                })
            })
        }
    }

    function initSliders() {
        if (document.querySelector('.hero__slider')) {
            var heroSlider = new Swiper('.hero__slider', {
                pagination: {
                    el: '.hero__pagination',
                    clickable: true,
                },
                direction: 'vertical',
                breakpoints: {
                    320: {
                        direction: 'horizontal',
                    },
                    1025: {
                        direction: 'vertical',
                    }
                }
            });
        }
        if (document.querySelector('.reviews__slider')) {
            var reviewsSlider = new Swiper('.reviews__slider', {
                slidesPerView: 2,
                navigation: {
                    prevEl: '.reviews__prev',
                    nextEl: '.reviews__next',
                },
                spaceBetween: 5,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                    },
                    1025: {
                        slidesPerView: 2,
                    }
                }
            });
        }
    }

    function initModals() {
        MicroModal.init({
            onShow: modal => document.querySelector('html').classList.add('overflow-hidden'), // [1]
            onClose: modal => document.querySelector('html').classList.remove('overflow-hidden'), // [2]
            // openTrigger: 'data-custom-open', // [3]
            // closeTrigger: 'data-custom-close', // [4]
            openClass: 'is-open', // [5]
            disableScroll: true, // [6]
            disableFocus: false, // [7]
            awaitOpenAnimation: true, // [8]
            awaitCloseAnimation: true, // [9]
            debugMode: true // [10]
          });
        
    }

    
    function initFixedHeader() {
        
        if (window.innerWidth > 1024) {
            window.addEventListener('scroll', function() {
                let offsetY = window.pageYOffset;
                
                if (offsetY >= 120) headerBottom.classList.add('fixed');
                else headerBottom.classList.remove('fixed');
            })

        }
    }
    
    initMenu();
    initFixedHeader();
    initSliders();
    // initModals();
})
