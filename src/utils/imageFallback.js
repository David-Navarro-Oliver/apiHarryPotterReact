import placeholder from '../assets/placeholder-character.jpg';

export function getSafeImageSrc(src) {
  return src && src.trim() !== '' ? src : placeholder;
}

export function applyImageFallback(event) {
  const img = event.currentTarget;
  if (!img || img.dataset.fallbackApplied === 'true') return;

  img.dataset.fallbackApplied = 'true';
  img.src = placeholder;
}
