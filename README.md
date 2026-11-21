# soc-doc-loc website

Static site in `site/` (`index.html`, `builders.html`, `housing-societies.html`, `assets/`).

Deploy: push to `main` runs `.github/workflows/deploy.yml`, which syncs `site/` to S3 and invalidates CloudFront.
