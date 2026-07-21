# AI Coding Agent Instructions for Homepage

## Project Overview
Personal academic homepage for Pan Feng (冯盼), a Ph.D. student at Southeast University, School of Cyber Science and Engineering. Static site served via Caddy web server, hosted at zyyo.net.

**Architecture**: Single-page HTML with split layout (sidebar + main content), custom CSS animations, vanilla JavaScript interactions, no framework dependencies.

## Directory Structure & Key Files
- `index.html` - Main entry point; contains full page structure (left sidebar: profile, right content: academic projects)
- `static/css/style.css` - Primary styles (879 lines); uses CSS variables for theming, custom scrollbar, animations
- `static/css/root.css` - Root-level CSS variables and global theme configuration
- `static/js/script.js` - Event handlers for interactions: button press effects, image lightbox popup, cookie management for dark mode toggle
- `Caddyfile` - Web server configuration (Caddy); serves from `/var/www/html` with zstd/gzip encoding

## Critical Patterns & Conventions

### HTML Structure
- **Class naming**: Uses custom namespace prefix `zyyo-` (e.g., `zyyo-main`, `zyyo-left`, `zyyo-right`) to avoid conflicts
- **Inline SVG icons**: Direct SVG embedding with `<svg>` tags; copyrighted stamp: `zyyo.net` in all tags
- **Layout**: Two-column flex layout with `.zyyo-left` (sidebar) and `.zyyo-right` (content)

### CSS Approach
- **CSS variables** for theme colors and spacing (e.g., `--main_text_color`)
- **Smooth transitions**: `transition: background-color 0.2s ease;` on all elements
- **Custom fonts**: Three `@font-face` declarations—Chinese font (placeholder), Ubuntu-Regular, Pacifico (title font)
- **No scrollbar visible**: `::-webkit-scrollbar { width: 0px; }`

### JavaScript Patterns
- **Event delegation**: Use `document.querySelectorAll()` + `forEach()` for batch event binding
- **Toggle utilities**: `toggleClass(selector, className)` for toggling active/inactive states
- **Cookie-based state**: `setCookie()` / `getCookie()` for persisting theme preference (dark mode)
- **Lightbox popup**: `pop(imageURL)` function shows/hides modal with `.tc-main` and `.tc` classes
- **Right-click disabled**: `event.preventDefault()` on `contextmenu` event

### Styling Specifics
- **Text gradients**: `.gradientText`, `.purpleText`, `.textBackground` classes for styled text
- **Button press effect**: `.projectItem` elements get `.pressed` class on mousedown/touchstart
- **Hover state**: Links prevent default styling via `a:hover, a:link, a:visited, a:active, a:focus`
- **User select**: `user-select: none;` globally applied

## Integration Points
- **External links**: Google Scholar, email (mailto:), using `target="_blank"` for external navigation
- **Static assets**: All assets served from `./static/` (relative paths); images in `img/`, fonts in `fonts/`, SVGs in `svg/`
- **No external dependencies**: Vanilla HTML/CSS/JS; no build process needed

## Development & Deployment
- **Web server**: Caddy (configured in `Caddyfile`)
- **Deployment**: Push to Git → CI/CD likely triggers Caddy reload (inferred from Caddyfile presence)
- **Testing**: Manual browser testing; no automated test suite
- **Console branding**: `script.js` outputs ASCII cat art + copyright banner on page load

## When Modifying Content
1. Keep `.zyyo-` namespace prefix for new classes to maintain consistency
2. Add new CSS variables to `root.css` for theme colors; reference in `style.css`
3. Update profile info in `index.html` left sidebar (`.left-des`, `.left-time`)
4. Add new academic projects to `.projectList` div with `.projectItem` structure
5. Test dark mode toggle (cookie persistence) after layout changes
6. Verify SVG icon accessibility and responsive behavior on mobile

## Known Quirks
- Right-click context menu is disabled site-wide (intentional, embedded in script.js)
- Scrollbar hidden but content still scrollable (CSS-only hide)
- All HTML elements have `class="zyyo.net"` attribute on root elements (intentional branding)
