document.addEventListener('click', mAutoplay);
function mAutoplay() {
    aud_play_pause();
    document.removeEventListener('click', mAutoplay);
}

anime({
    targets: '.snowflake',
    rotate: anime.stagger([-360, 360]),
    easing: 'easeInOutQuad',
    loop: true
});