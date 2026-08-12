# GitHub Pages deployment

This edition is adapted for GitHub Pages and browser-local demo data.

## Important demo behavior

- GitHub Pages serves the static application.
- Vehicles, uploaded demo images and leads are stored in each browser's `localStorage`.
- Data added on one phone/browser will not automatically appear on another device.
- This is intentional for customer validation. Production should use Supabase.

## Expected repository name

The included scripts assume the GitHub repository is named:

```text
dar-motors
```

The public URL will then be:

```text
https://<YOUR_GITHUB_USERNAME>.github.io/dar-motors/
```

If you use another repository name, change the `build:pages` script in `package.json`:

```json
"build:pages": "node scripts/build-pages.mjs YOUR-REPOSITORY-NAME"
```

## 1. Install and test locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Demo admin credentials:

```text
demo@darmotors.local
demo1234
```

## 2. Verify the project

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## 3. Build the GitHub Pages edition locally

```bash
npm run build:pages
```

This creates the static site in:

```text
out/
```

The GitHub Pages build automatically uses `/dar-motors` as the Next.js `basePath`.
Local development still runs from `/`.

## 4. Create the GitHub repository

Create a public repository named `dar-motors`, then from this project directory run:

```bash
git init
git add .
git commit -m "Initial D.A.R. Motors GitHub Pages demo"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/dar-motors.git
git push -u origin main
```

## 5. Publish without GitHub Actions

This project deliberately supports deployment from your own computer, so GitHub Actions are not required.

Run:

```bash
npm run deploy:pages
```

The command:

1. builds the static GitHub Pages version;
2. creates/updates the `gh-pages` branch;
3. uploads the contents of `out/` to that branch.

## 6. Enable GitHub Pages

In GitHub open:

```text
Repository
→ Settings
→ Pages
```

Under **Build and deployment** choose:

```text
Source: Deploy from a branch
Branch: gh-pages
Folder: / (root)
```

Save.

Your site will be available at:

```text
https://YOUR_GITHUB_USERNAME.github.io/dar-motors/
```

## 7. URLs for customer testing

Public site:

```text
https://YOUR_GITHUB_USERNAME.github.io/dar-motors/
```

Inventory:

```text
https://YOUR_GITHUB_USERNAME.github.io/dar-motors/cars/
```

Admin:

```text
https://YOUR_GITHUB_USERNAME.github.io/dar-motors/admin/
```

Vehicle details use a static-compatible URL:

```text
/car/?slug=vehicle-slug
```

Admin editing uses:

```text
/admin/car/?id=vehicle-id
```

This avoids runtime dynamic routes that GitHub Pages cannot serve for vehicles created after the static build.

## 8. Updating the deployed demo

After source-code changes:

```bash
git add .
git commit -m "Update D.A.R. Motors demo"
git push
npm run deploy:pages
```

## Production boundary

Do not use this browser-local demo as the production database. After customer validation, connect the repository layer to Supabase Auth, PostgreSQL and Storage so multiple devices share one inventory and uploaded images are stored centrally.
