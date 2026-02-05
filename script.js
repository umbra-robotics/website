const lightGlow = document.getElementById('light-glow');
const handShadow = document.getElementById('hand-shadow');

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

const OFFSET_FACTOR = 0.15;
const MIN_BLUR = 8;
const MAX_BLUR = 20;
const MIN_OPACITY = 0.2;
const MAX_OPACITY = 0.4;

function updateShadow(x, y) {
  // Move light glow to cursor position
  lightGlow.style.left = x + 'px';
  lightGlow.style.top = y + 'px';

  // Calculate distance from center
  const dx = x - centerX;
  const dy = y - centerY;
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
  const dist = Math.sqrt(dx * dx + dy * dy);
  const normalizedDist = Math.min(dist / maxDist, 1);

  // Shadow moves opposite to light source
  const shadowX = -dx * OFFSET_FACTOR;
  const shadowY = -dy * OFFSET_FACTOR;

  // Dynamic blur: sharper when light is close, softer when far
  const blur = MIN_BLUR + (MAX_BLUR - MIN_BLUR) * normalizedDist;

  // Dynamic opacity: slightly stronger when close
  const opacity = MAX_OPACITY - (MAX_OPACITY - MIN_OPACITY) * normalizedDist;

  handShadow.style.transform = `translate(${shadowX}px, ${shadowY}px)`;
  handShadow.style.filter = `blur(${blur}px)`;
  handShadow.style.opacity = opacity;
}

// Mouse tracking
document.addEventListener('mousemove', function (e) {
  updateShadow(e.clientX, e.clientY);
});

// Touch support
document.addEventListener('touchmove', function (e) {
  e.preventDefault();
  const touch = e.touches[0];
  updateShadow(touch.clientX, touch.clientY);
}, { passive: false });

document.addEventListener('touchstart', function (e) {
  const touch = e.touches[0];
  updateShadow(touch.clientX, touch.clientY);
});

// Recalculate center on resize
window.addEventListener('resize', function () {
  centerX = window.innerWidth / 2;
  centerY = window.innerHeight / 2;
});

// Initialize shadow at center
updateShadow(centerX, centerY);
