# Stinerplys Red Website – Professional Edition

## Quick Deploy
1. **Netlify**: Drag folder to [netlify.com/drop](https://netlify.com/drop). Auto-HTTPS, custom domain ready.
2. **Vercel**: `npm i -g vercel` → `vercel` in folder. Free tier crushes.
3. **GitHub Pages**: Push to repo, enable in settings. Add `.nojekyll` if needed.
4. **Prod Build**: Install Tailwind CLI (`npm i -D tailwindcss`), run `npx tailwindcss -i ./input.css -o ./styles.css --minify`. Minify JS with Terser.

## Customization
- **Copy/SEO**: Swap H1s, metas. Add slugs to blog links (e.g., href="/blog/slug").
- **Images**: All WebP <100KB. Use Squoosh.app for compression. Update alts for SEO.
- **Forms**: Replace Formspree ID. Add reCAPTCHA keys from Google.
- **Analytics**: Swap GA_MEASUREMENT_ID. Test events in GA4.
- **A/B**: Toggle `.variant-red` on hero for tests. Use GA experiments.
- **Calendar**: Embed Calendly in contact.html iframe src.
- **Privacy**: Create /privacy.html with GDPR text.

## Performance & Testing
- **Lighthouse**: Run Chrome DevTools → Aim 98+ (mobile/desktop). Lazy loads + minify = win.
- **Accessibility**: WAVE or axe tools → All ARIA, contrasts pass WCAG 2.1 AA.
- **Responsiveness**: Chrome DevTools devices → Fluid on all.
- **Security**: HTTPS auto; sanitize forms server-side.

## Extras
- **Popup**: Exit-intent triggers on desktop. Customize trigger in JS.
- **Schema**: Rich snippets ready – verify with Google's tool.
- **Sitemap**: Add sitemap.xml for SEO (generate via plugin).

Launch live? hello@stinerplysred.com. Let's make it roar.