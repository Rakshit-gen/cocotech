# Deploy CocoTech

This is a static site. It does not need a Node server, database, API keys or a framework runtime.

## Build the upload files

```sh
cd /Users/rakshitsisodiya/dev/cocotech
python3 scripts/build.py
```

The script creates `dist/` and `cocotech-deploy.zip`. The ZIP has `index.html` at its root. Only the 21 explicitly listed site files are included. Source documentation, browser tests, screenshots and local development packages are excluded.

## Cloudflare Pages with automatic deployments

For ongoing updates, put this project in its own GitHub or GitLab repository, then connect the repository in Cloudflare's Workers & Pages dashboard using the Pages Git integration workflow.

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Production branch | Your release branch, usually `main` |
| Root directory | Repository root if the repo contains only this project; otherwise the `cocotech` subdirectory |
| Build command | `python3 scripts/build.py` |
| Build output directory | `dist` |
| Environment variable | `SKIP_DEPENDENCY_INSTALL=true` |

The build uses Python's standard library, so Cloudflare does not need to install the optional local browser-test dependencies. Review preview deployments before merging changes into the production branch.

Official instructions: [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/), [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [skipping dependency installation](https://developers.cloudflare.com/pages/configuration/build-image/).

## Manual upload alternative

In Workers & Pages, create a Pages project using the drag-and-drop upload option. Upload `cocotech-deploy.zip` or the contents of `dist/`, then deploy. Do not upload the entire source folder.

Direct Upload projects cannot later be converted to Git-integrated projects. You would need a new project for Git integration, so choose the Git route from the start if you expect frequent changes.

Official instructions: [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

## Domain and launch verification

1. Verify the generated `pages.dev` deployment first.
2. Add the domain through the Pages project's **Custom domains** section before changing DNS. Follow the records Cloudflare provides. An apex domain requires the domain to be a Cloudflare zone; an externally managed subdomain can use a CNAME.
3. Wait for the custom domain and certificate to become active, then check the site over HTTPS.
4. Open `/`, `/acoustics`, `/energy` and `/vision` directly, and refresh each one. Try `/acoustics#lab` and `/energy#lab` as shared links.
5. Test the menu on a phone, the material controls, both models and the editable brief download.
6. Open a nonexistent URL and confirm it returns a 404 status with the designed error page.
7. Inspect response headers for the Content Security Policy and confirm there are no blocked scripts, fonts or styles in the browser console.

Official instructions: [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), [routing and caching](https://developers.cloudflare.com/pages/configuration/serving-pages/), [custom headers](https://developers.cloudflare.com/pages/configuration/headers/).

Keep Cloudflare's default cache behavior. The asset filenames are not content-hashed, so forcing long browser cache lifetimes could leave users on an old version after an update.

## Included deployment safeguards

- Both `.html` URLs and the host's extensionless URLs resolve to the right content.
- `404.html` prevents arbitrary missing URLs from silently displaying the home page.
- `_headers` sets CSP, MIME-sniffing protection, a referrer policy and iframe restrictions. Inline styles remain allowed because the specimen controls update CSS properties; inline scripts are not allowed.
- All fonts, diagrams and runtime scripts are local. There are no third-party runtime calls.
- `robots.txt` permits indexing. Add the final domain's canonical URLs and sitemap once that domain is chosen.

## What publishing does not add

The project-brief feature downloads a text file; it does not email CocoTech or save a lead. A real inquiry flow needs an approved address or submission endpoint. If one is added, update the CSP to permit only the required destination and test the submission end to end.

The products remain R&D concepts. Publishing does not change the status of performance results, availability or environmental claims. The business model is still described as proposed.

The artifact is tested locally with a production-style server that exercises clean URLs, redirects and security headers. Actual DNS, TLS and provider behavior must still be checked on the live deployment.
