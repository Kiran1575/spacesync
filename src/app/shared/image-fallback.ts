export const IMAGE_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#E2E8F0"/>
  <circle cx="400" cy="200" r="46" fill="#CBD5E1"/>
  <path d="M368 218 L392 190 L414 212 L438 184 L462 222 Z" fill="#94A3B8"/>
  <text x="400" y="300" font-family="Poppins, sans-serif" font-size="22" font-weight="600" fill="#94A3B8" text-anchor="middle">
    Image not available
  </text>
</svg>`);

export function handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  if (img && img.src !== IMAGE_PLACEHOLDER) {
    img.src = IMAGE_PLACEHOLDER;
  }
}