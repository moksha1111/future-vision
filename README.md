# Future Vision — SVG-mask scroll-zoom landing page

> Tech-startup landing page with an SVG-mask "FUTURE" headline over video and an exponential scroll-zoom through the letter "U."

**[Live demo →](https://future-vision-3qd0.onrender.com)**

![preview](docs/preview.gif)

## What it does

A flagship-style landing page where the headline word **FUTURE** is cut out as an SVG mask over a looping video. As the user scrolls, the page exponentially zooms through the inner counter of the letter "U," landing in a glassmorphism Vision section.

## Tech

React 18 · Vite · Tailwind CSS v3 · SVG `mask` · scroll-tied transforms

## Highlights

- SVG mask reveals a looping background video through the letterforms
- Exponential `scale()` curve tied to scroll progress so the zoom accelerates dramatically into the "U"
- Glassmorphism Vision section seamlessly continues the camera move
- All scroll math runs in `requestAnimationFrame` — no transition fights

## Run locally

```bash
npm install
npm run dev    # http://localhost:5196
```
