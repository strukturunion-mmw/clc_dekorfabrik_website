# Favicon

- `favicon.svg` — 32×32 viewBox, source file for the site favicon. Modern browsers accept SVG favicons directly; link via `<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>`.
- `apple-touch-icon.svg` — 180×180 viewBox for iOS home-screen install. If you need a PNG, export this at 180×180 px.

Both use the logo square (`--sky-500`) with the `df` letters (`--azure-600`) in Share.

## Recommended `<head>` block

```html
<link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg"/>
<link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png"/>
<meta name="theme-color" content="#F7F3EA"/>
```
