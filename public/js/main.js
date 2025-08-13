(function (window, document, undefined) {
	'use strict';

	/*==============================
	Preloader
	==============================*/
	if (document.querySelector('.preloader')) {
		// window.addEventListener('load', () => {
		// 	const preloader = document.getElementById('preloader');
		// 	preloader.classList.add('fade-out');
		// 	setTimeout(() => {
		// 		preloader.remove();
		// 	}, 400);
		// });

		window.addEventListener('load', () => {
			const preloader = document.getElementById('preloader');
			setTimeout(() => {
				preloader.classList.add('fade-out');
				setTimeout(() => preloader.remove(), 600);
			}, 1000);
		});
	}

	/*==============================
	Header
	==============================*/
	if (document.querySelector('.menu')) {
		const headerBtn = document.querySelector('.header__btn');
		const headerNav = document.querySelector('.menu');

		function toggleHeaderMenu() {
			headerBtn.classList.toggle('header__btn--active');
			headerNav.classList.toggle('menu--active');
		}

		headerBtn.addEventListener('click', toggleHeaderMenu);
	}

	if (document.querySelector('.header__action--volume')) {
		var headerVolume = document.querySelector('.header__action--volume');

		function toggleVolume() {
			headerVolume.classList.toggle('active');
		}

		headerVolume.addEventListener('click', toggleVolume);
	}

	if (document.querySelector('.header__drop')) {
		document.addEventListener('DOMContentLoaded', function () {
			document.querySelectorAll('.header__drop-menu').forEach(menu => {
				menu.addEventListener('click', function (e) {
					e.stopPropagation();
				});
			});
		});
	}

	if (document.querySelector('.menu__action--volume')) {
		var menuVolume = document.querySelector('.menu__action--volume');

		function toggleVolume() {
			menuVolume.classList.toggle('active');
		}

		menuVolume.addEventListener('click', toggleVolume);
	}

	/*==============================
	Frame
	==============================*/
	if (document.querySelector('.frame__drop')) {
		document.addEventListener('DOMContentLoaded', function () {
			function initializeDropdownType(context = document) {
				const dropdowns = context.querySelectorAll('.frame__drop');

				dropdowns.forEach((dropdown) => {
					const button = dropdown.querySelector('.frame__drop-btn');
					if (!button) return;

					const span = button.querySelector('span');
					if (!span) return;

					const items = dropdown.querySelectorAll('.frame__drop-menu li');

					items.forEach((item) => {
						item.addEventListener('click', function () {
							items.forEach((el) => el.classList.remove('active'));
							this.classList.add('active');
							const newText = this.querySelector('span').textContent.trim();
							span.textContent = newText;
						});
					});
				});
			}

			initializeDropdownType();
		});
	}

	if (document.querySelector('.frame__btns')) {
		document.addEventListener('DOMContentLoaded', function () {
			const buttons = document.querySelectorAll('.frame__btns .frame__btn');

			buttons.forEach(btn => {
				btn.addEventListener('click', function () {
					if (this.classList.contains('active')) {
						this.classList.remove('active');
					} else {
						buttons.forEach(b => b.classList.remove('active'));
						this.classList.add('active');
					}
				});
			});
		});
	}

	/*==============================
	Ticker
	==============================*/
	if (document.querySelector('.ticker')) {
		var elms = document.getElementsByClassName('ticker');

		for ( var i = 0; i < elms.length; i++ ) {
			(function(elm) {
				var splide = new Splide(elm, {
					type: 'loop',
					drag: 'free',
					pagination: false,
					autoWidth: true,
					autoHeight: false,
					speed: 1200,
					gap: 8,
					arrows: false,
					focus: 'center',
					autoScroll: {
						speed: .5,
						pauseOnHover: false,
						pauseOnFocus: false,
					},
				}).mount(window.splide.Extensions);

				function debounce(func, wait) {
					let timeout;
					return function () {
						const context = this;
						const args = arguments;
						clearTimeout(timeout);
						timeout = setTimeout(() => func.apply(context, args), wait);
					};
				}

				const debouncedRefresh = debounce(() => {
					splide.refresh();
				}, 100);

				const resizeObserver = new ResizeObserver(() => {
					splide.Components.Elements.track.style.transition = "none";
					debouncedRefresh();
					setTimeout(() => {
						splide.Components.Elements.track.style.transition = "";
					}, 150);
				});

				resizeObserver.observe(elm.parentElement);
			})(elms[i]);
		}
	}

	/*==============================
	Track
	==============================*/
	if (document.querySelector('.xtable__content--track')) {
		document.addEventListener('DOMContentLoaded', function () {
			const allPairs = document.querySelectorAll('.pair');

			allPairs.forEach(pair => {
				pair.addEventListener('click', function () {
					if (this.classList.contains('active')) {
						this.classList.remove('active');
					} else {
						allPairs.forEach(p => p.classList.remove('active'));
						this.classList.add('active');
					}
				});
			});
		});
	}

	/*==============================
	Apigame
	==============================*/
	if (document.querySelector('.apigame')) {
		document.querySelectorAll('.apigame__btn').forEach(btn => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.apigame__btn').forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
				const isGreen = btn.classList.contains('green');
				const bet = document.querySelector('.apigame__bet');
				bet.classList.remove('green', 'red');
				bet.classList.add(isGreen ? 'green' : 'red');
			});
		});
	}

	/*==============================
	Tabs
	==============================*/
	if (document.querySelector('.htp')) {
		document.querySelectorAll('.htp__content').forEach((content) => {
			const tabs = content.querySelectorAll('.htp__tab');
			const imgs = content.querySelectorAll('.htp__img img');
			let index = 0;
			let interval;

			function setActive(i) {
				tabs.forEach(t => t.classList.remove('active'));
				imgs.forEach(img => img.classList.remove('active'));

				tabs[i].classList.add('active');
				imgs[i].classList.add('active');

				index = i;
			}

			function startInterval() {
				interval = setInterval(() => {
					const next = (index + 1) % tabs.length;
					setActive(next);
				}, 5000);
			}

			function stopInterval() {
				clearInterval(interval);
			}

			imgs.forEach((img, i) => {
				if (i === 0) img.classList.add('active');
				else img.classList.remove('active');
			});
			startInterval();

			tabs.forEach((tab, i) => {
				tab.addEventListener('mouseenter', () => {
					stopInterval();
					setActive(i);
				});
				tab.addEventListener('mouseleave', () => {
					startInterval();
				});
			});
		});
	}

	/*==============================
	Sheet
	==============================*/
	document.querySelectorAll('.open-sheet-btn').forEach(button => {
		button.addEventListener('click', () => {
			const targetSelector = button.dataset.target;
			const sheet = document.querySelector(targetSelector);
			const sheetBg = document.querySelector('.sheet');
			if (sheet) {
				sheet.classList.add('open');
				sheetBg.classList.add('open');
			}
		});
	});

	document.querySelectorAll('.bottom-sheet__handle').forEach(handle => {
		handle.addEventListener('click', () => {
			const sheet = handle.closest('.bottom-sheet');
			const sheetBg = document.querySelector('.sheet');
			if (sheet) {
				sheet.classList.remove('open');
				sheetBg.classList.remove('open');
			}
		});
	});

})(window, document);