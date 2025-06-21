document.addEventListener('DOMContentLoaded', () => {

    $(document).ready(function() {
        const $navbarToggler = $('.navbar-toggler');
        const $navLinks = $('.header__nav-links');
        const $body = $('body');

        $navbarToggler.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $navLinks.toggleClass('active');
        });

        $body.on('click', function(e) {
            const $target = $(e.target);
            if (!$target.closest('.header__nav-links').length && 
                !$target.closest('.navbar-toggler').length) {
                $navLinks.removeClass('active');
            }
        });

        $navLinks.find('.nav-link').on('click', function() {
            $navLinks.removeClass('active');
        });
    });

    const scrollAmount = 240;

    function setupCarousel(carouselClass, itemWidth) {
        const carousel = $(carouselClass);
        const prevBtn = carousel.closest('.container').find('.btn-carousel-prev');
        const nextBtn = carousel.closest('.container').find('.btn-carousel-next');

        nextBtn.on('click', function(){
            const currentCarousel = $(this).closest('.container').find(carouselClass);
            currentCarousel.animate({
                scrollLeft: currentCarousel.scrollLeft() + itemWidth
            }, 300);
        });

        prevBtn.on('click', function(){
            const currentCarousel = $(this).closest('.container').find(carouselClass);
            currentCarousel.animate({
                scrollLeft: currentCarousel.scrollLeft() - itemWidth
            }, 300);
        });
    }

    setupCarousel('.product-carousel', 240);
    setupCarousel('.brand-carousel', 170);

    $('.hero-carousel-controls__item').on('click', function(){
        const slideIndex = $(this).data('slide-to');
        $('#heroCarousel').carousel(slideIndex);
    });

    $('#heroCarousel').on('slid.bs.carousel', function (e) {
        const activeIndex = e.to;
        $('.hero-carousel-controls__item').removeClass('active');
        $('.hero-carousel-controls__item[data-slide-to="' + activeIndex + '"]').addClass('active');
    });

    const tagsCarousel = $('#tags-carousel');
    if (tagsCarousel.length > 0) {
        const tagsNextBtn = $('#tags-next');
        const tagsScrollAmount = 300;

        tagsNextBtn.on('click', function(){
            let currentScroll = tagsCarousel.scrollLeft();
            let maxScroll = tagsCarousel[0].scrollWidth - tagsCarousel.innerWidth();
            if (currentScroll + tagsScrollAmount >= maxScroll) {
                tagsCarousel.animate({ scrollLeft: 0 }, 300);
            } else {
                tagsCarousel.animate({ scrollLeft: currentScroll + tagsScrollAmount }, 300);
            }
        });
    }

    const bestsellerProducts = {
        supplements: [
            { img: '11.jpg.png', name: 'California Gold Nutrition, LactoBif® 30 Probiotics, 30 Billion CFU, 60 Veggie', rating: 143916, price: '1,202.22' },
            { img: '8.jpg.png', name: 'California Gold Nutrition, Omega-3 Premium Fish Oil, 100 Fish Gelatin', rating: 445214, price: '591.06', oldPrice: '695.37' },
            { img: '14.jpg.png', name: 'Doctor\'s Best, High Absorption Magnesium, 240 Tablets (100 mg Per', rating: 161162, price: '1,146.94' },
            { img: '35.jpg.png', name: 'California Gold Nutrition, Gold C™, USP Grade Vitamin C, 1,000 mg, 60', rating: 352215, price: '296.12' },
        ],
        bath: [
            { img: '57.jpg.png', name: 'Act, Anticavity Fluoride Mouthwash, Alcohol Free, Mint, 18 fl oz (532 ml)', rating: 736, price: '541.46' },
            { img: '35.jpg.png', name: 'Avalon Organics, Thickening Shampoo, Biotin B-Complex, 14 fl oz', rating: 61215, price: '715.18' }
        ],
        beauty: [
            { img: '69.jpg.png', name: 'Axis-Y, Dark Spot Correcting Glow Serum, 1.69 fl oz (50 ml)', rating: 11267, price: '969.36' },
            { img: '8.jpg.png', name: 'Mild By Nature, Witch Hazel, Alcohol-Free, Unscented, 12 fl oz (355 ml)', rating: 8673, price: '412.87', oldPrice: '550.50' }
        ],
        sports: [
            { img: '8.jpg.png', name: 'California Gold Nutrition, Omega-3 Premium Fish Oil, 100 Fish Gelatin', rating: 445214, price: '591.06', oldPrice: '695.37' },
        ],
        grocery: [ { img: '35.jpg.png', name: 'California Gold Nutrition, Gold C™, USP Grade Vitamin C, 1,000 mg, 60', rating: 352215, price: '296.12' },],
        kids: [ { img: '11.jpg.png', name: 'California Gold Nutrition, LactoBif® 30 Probiotics, 30 Billion CFU, 60 Veggie', rating: 143916, price: '1,202.22' },],
        pets: [ { img: '35.jpg.png', name: 'California Gold Nutrition, Gold C™, USP Grade Vitamin C, 1,000 mg, 60', rating: 352215, price: '296.12' },],
        home: [  { img: '8.jpg.png', name: 'California Gold Nutrition, Omega-3 Premium Fish Oil, 100 Fish Gelatin', rating: 445214, price: '591.06', oldPrice: '695.37' },]
    };

    function renderBestsellers(category) {
        const carousel = $('#bestsellers-carousel');
        carousel.empty();
        const products = bestsellerProducts[category] || [];

        if (products.length === 0) {
            carousel.html('<p class="col-12">No products to display in this category.</p>');
            return;
        }

        products.forEach(product => {
            const priceHtml = product.oldPrice 
                ? `<strong>EGP${product.price}</strong><del>EGP${product.oldPrice}</del>`
                : `<strong>EGP${product.price}</strong>`;

            const cardHtml = `
                <div class="product-card">
                    <img src="../images/${product.img}" alt="${product.name}" class="product-card__image">
                    <div class="product-card__info">
                        <h3 class="product-card__name">${product.name}</h3>
                        <div class="product-card__rating">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                            <span>${product.rating.toLocaleString()}</span>
                        </div>
                        <p class="product-card__price">${priceHtml}</p>
                    </div>
                </div>`;
            carousel.append(cardHtml);
        });
    }

    $('.filter-tag').on('click', function(e) {
        e.preventDefault();
        const filter = $(this).data('filter');
        $('.filter-tag').removeClass('active');
        $(this).addClass('active');
        renderBestsellers(filter);
    });

    renderBestsellers('supplements');

    const liveCarousel = $('#live-carousel');
    if (liveCarousel.length > 0) {
        const livePrevBtn = $('#live-prev');
        const liveNextBtn = $('#live-next');
        const livePausePlayBtn = $('#live-pause-play');
        let liveInterval;

        const firstItem = liveCarousel.find('.live-carousel-item').first();
        if (firstItem.length === 0) return;
        const liveItemWidth = firstItem.outerWidth(true);

        function startLiveCarousel() {
            clearInterval(liveInterval);
            liveInterval = setInterval(function() {
                let currentScroll = liveCarousel.scrollLeft();
                let maxScroll = liveCarousel[0].scrollWidth - liveCarousel.innerWidth();
                if (currentScroll >= maxScroll - 5) {
                    liveCarousel.stop(true).animate({ scrollLeft: 0 }, 800, 'linear');
                } else {
                    liveCarousel.stop(true).animate({ scrollLeft: currentScroll + liveItemWidth }, 400, 'swing');
                }
            }, 3000);
            livePausePlayBtn.html('<i class="fas fa-pause"></i>');
        }

        function stopLiveCarousel() {
            clearInterval(liveInterval);
            liveInterval = null;
            liveCarousel.stop(true);
            livePausePlayBtn.html('<i class="fas fa-play"></i>');
        }

        liveNextBtn.on('click', function(){
            liveCarousel.stop(true).animate({ scrollLeft: liveCarousel.scrollLeft() + liveItemWidth }, 300);
        });

        livePrevBtn.on('click', function(){
            liveCarousel.stop(true).animate({ scrollLeft: liveCarousel.scrollLeft() - liveItemWidth }, 300);
        });

        livePausePlayBtn.on('click', function() {
            if (liveInterval) {
                stopLiveCarousel();
            } else {
                startLiveCarousel();
            }
        });
        
        startLiveCarousel();
    }

    const selectedTagsCarousel = document.getElementById('selected-tags-carousel');
    const selectedTagsNextBtn = document.getElementById('selected-tags-next');

    if (selectedTagsCarousel && selectedTagsNextBtn) {
        selectedTagsNextBtn.addEventListener('click', () => {
            const scrollAmount = selectedTagsCarousel.querySelector('.tag-item').offsetWidth + 12;
            selectedTagsCarousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});
