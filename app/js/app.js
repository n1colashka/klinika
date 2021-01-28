document.addEventListener('DOMContentLoaded', () => {
    const headerNavigationList =  document.querySelectorAll('.header__navigation-list');
    const headerBottom =  document.querySelector('.header__bottom');
    const header =  document.querySelector('.header');
    const menuBtn =  document.querySelector('.header__menu-btn');
    const menu =  document.querySelector('.menu');
    const overlay =  document.querySelector('.overlay');
    const html =  document.querySelector('html');
    const menuList = document.querySelectorAll('.menu__list');
    const accordions = document.querySelectorAll('.accordion');

    function initMenu() {
        menuBtn.addEventListener('click', openMenu);
    
        document.body.addEventListener('click', function(e) {
            if (!e.target.closest('.header')) {
                closeMenu();
            }
        })

        toggleMenuList();
        initMenuHover();

        
        function initMenuHover() {
            if (window.innerWidth > 1024) {
                headerNavigationList.forEach(list => {
                    list.addEventListener('mouseover', function() {
                        header.classList.add('hovered');
                        overlay.classList.add('active');
                    })
                    list.addEventListener('mouseout', function() {
                        header.classList.remove('hovered');
                        overlay.classList.remove('active');
                    })
                })
            }
        }

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
        if (document.querySelector('.article__slider')) {
            var articleSlider = new Swiper('.article__slider', {
                slidesPerView: 4,
                navigation: {
                    prevEl: '.article__prev',
                    nextEl: '.article__next',
                },
                spaceBetween: 15,
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        // spaceBetween: 30,
                    },
                    480: {
                        spaceBetween: 15,
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    901: {
                        slidesPerView: 4,
                    }
                }
            });
        }
    }

    function initModals() {
        MicroModal.init({
            onShow: modal => document.querySelector('html').classList.add('overflow-hidden'), // [1]
            onClose: modal => document.querySelector('html').classList.remove('overflow-hidden'), // [2]
            openClass: 'is-open', // [5]
            disableScroll: true, // [6]
            disableFocus: false, // [7]
            awaitOpenAnimation: true, // [8]
            awaitCloseAnimation: true, // [9]
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

    function initServicesAccordions() {
        if (accordions.length > 0) {
            accordions.forEach(accordion => {
                accordion.addEventListener('click', function(e) {
                    const items = document.querySelectorAll('.accordion__item');
                    e.preventDefault();
                    if (e.target.closest('.accordion__item')) {
                        items.forEach(item => {
                            item.classList.remove('open');
                        })
                        e.target.closest('.accordion__item').classList.add('open');
                    }
                })
            })
        }
    }

    function initRatings() {
        const ratings = document.querySelectorAll('.rating-all');

        if (ratings.length > 0) {
            let ratingActive, ratingValue, fault = 0;

            for (let index = 0; index < ratings.length; index++) {
                const rating = ratings[index];
                initRating(rating);
            }

            function initRating(rating) {
                initRatingVars(rating);
                setRatingActiveWidth();
            }
    
            function initRatingVars(rating) {
                ratingActive = rating.querySelector('.rating-all__active');
                ratingValue = rating.querySelector('.rating-all__value');
            }
    
            function setRatingActiveWidth(index = ratingValue.innerHTML) {

                const ratingActiveWidth = index / 0.05;
                ratingActive.style.width = `calc(${ratingActiveWidth}% - 2px`;
            }
        }
    }

    function initReviewsTabs() {
        const tabsTitle = document.querySelectorAll('[data-tab-title]');
        const tabsContent = document.querySelectorAll('[data-tab]');

        if (tabsTitle.length > 0) {
            tabsTitle.forEach(title => {
                title.addEventListener('click', function() {
                    tabsTitle.forEach(item => {
                        item.classList.remove('active');
                    })
                    tabsContent.forEach(item => {
                        item.classList.remove('active');
                    })
    
                    tabsContent.forEach(tab => {
                        if (tab.dataset.tab === title.dataset.tabTitle) {
                            tab.classList.add('active');
                            title.classList.add('active');
                        }
                    })
                })
            })
        }
    }

    initMenu();
    initFixedHeader();
    initSliders();
    initRatings();
    initServicesAccordions();
    initReviewsTabs();
    // initModals();
})
