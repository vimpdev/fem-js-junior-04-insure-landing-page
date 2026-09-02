const body = document.body;
const main = body.querySelector('main');
const footer = body.querySelector('footer');
const toggleButton = document.querySelector('.toggle-btn');
const headerNav = document.querySelector('.header__nav');
const desktopMedia = window.matchMedia('(width >= 70rem)');

let isMenuOpen = false;

function setMenuState(isOpen) {
  const isDesktop = desktopMedia.matches;

  if (isDesktop) {
    isMenuOpen = false;

    toggleButton.ariaExpanded = 'false';
    toggleButton.classList.remove('is-open');
    body.classList.remove('is-menu-open');

    headerNav.inert = false;
    main.inert = false;
    footer.inert = false;

    return;
  }

  toggleButton.ariaExpanded = String(isOpen);

  toggleButton.classList.toggle('is-open', isOpen);
  headerNav.classList.toggle('is-open', isOpen);
  body.classList.toggle('is-menu-open', isOpen);

  headerNav.inert = !isOpen;
  main.inert = isOpen;
  footer.inert = isOpen;
}

function handleToggle() {
  isMenuOpen = !isMenuOpen;
  setMenuState(isMenuOpen);
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isMenuOpen) {
    isMenuOpen = false;
    setMenuState(isMenuOpen);
    toggleButton.focus();
  }
}

setMenuState(isMenuOpen);

toggleButton.addEventListener('click', handleToggle);
document.addEventListener('keydown', handleKeydown);
desktopMedia.addEventListener('change', () => setMenuState(false));