document.addEventListener('DOMContentLoaded', () => {
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

    function initDynamicAdaptive() {
        // Dynamic Adapt v.1
        // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
        // e.x. data-da=".item,992,2"
        // Andrikanych Yevhen 2020
        // https://www.youtube.com/c/freelancerlifestyle
        function DynamicAdapt(type) {
            this.type = type;
        }

        DynamicAdapt.prototype.init = function () {
            const _this = this;
            // массив объектов
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            // массив DOM-элементов
            this.nodes = document.querySelectorAll("[data-da]");

            // наполнение оbjects объктами
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }

            this.arraySort(this.оbjects);

            // массив уникальных медиа-запросов
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
                return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });

            // навешивание слушателя на медиа-запрос
            // и вызов обработчика при первом запуске
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ',');
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];

                // массив объектов с подходящим брейкпоинтом
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function () {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };

        DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
            if (matchMedia.matches) {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    оbject.index = this.indexInParent(оbject.parent, оbject.element);
                    this.moveTo(оbject.place, оbject.element, оbject.destination);
                }
            } else {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    if (оbject.element.classList.contains(this.daClassname)) {
                        this.moveBack(оbject.parent, оbject.element, оbject.index);
                    }
                }
            }
        };

        // Функция перемещения
        DynamicAdapt.prototype.moveTo = function (place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === 'last' || place >= destination.children.length) {
                destination.insertAdjacentElement('beforeend', element);
                return;
            }
            if (place === 'first') {
                destination.insertAdjacentElement('afterbegin', element);
                return;
            }
            destination.children[place].insertAdjacentElement('beforebegin', element);
        }

        // Функция возврата
        DynamicAdapt.prototype.moveBack = function (parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== undefined) {
                parent.children[index].insertAdjacentElement('beforebegin', element);
            } else {
                parent.insertAdjacentElement('beforeend', element);
            }
        }

        // Функция получения индекса внутри родителя
        DynamicAdapt.prototype.indexInParent = function (parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };

        // Функция сортировки массива по breakpoint и place 
        // по возрастанию для this.type = min
        // по убыванию для this.type = max
        DynamicAdapt.prototype.arraySort = function (arr) {
            if (this.type === "min") {
                Array.prototype.sort.call(arr, function (a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }

                        if (a.place === "first" || b.place === "last") {
                            return -1;
                        }

                        if (a.place === "last" || b.place === "first") {
                            return 1;
                        }

                        return a.place - b.place;
                    }

                    return a.breakpoint - b.breakpoint;
                });
            } else {
                Array.prototype.sort.call(arr, function (a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }

                        if (a.place === "first" || b.place === "last") {
                            return 1;
                        }

                        if (a.place === "last" || b.place === "first") {
                            return -1;
                        }

                        return b.place - a.place;
                    }

                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };

        const da = new DynamicAdapt("max");
        da.init();
    }

    initDynamicAdaptive();
    initMenu();
    initSliders();
    // initModals();
})
