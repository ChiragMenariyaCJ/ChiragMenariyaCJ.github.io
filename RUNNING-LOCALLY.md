# Run and edit Cyber With CJ locally

This guide covers the normal edit and preview workflow for the MkDocs site.

## 1. Open the repository

Open a PowerShell terminal in:

```powershell
cd "D:\Projects\ChiragMenariyaCJ.github.io"
```

## 2. Install the site dependencies

Run this once, or again after changing `requirements.txt`:

```powershell
pip install --user -r requirements.txt
```

## 3. Start the live preview

```powershell
python -m mkdocs serve
```

Open <http://127.0.0.1:8000/> in your browser. MkDocs rebuilds the preview automatically when you save a file.

Stop the server with **Ctrl+C**.

If `python` is not recognised, try the Windows launcher:

```powershell
py -m mkdocs serve
```

If both aliases fail, use the full interpreter path below:

```powershell
& "C:\Users\chira\AppData\Local\Python\pythoncore-3.14-64\python.exe" -m mkdocs serve
```

## 4. Edit the site

- Add or change pages in `docs/`.
- Change the navigation, theme, colours, and features in `mkdocs.yml`.
- Change the visual styling in `docs/stylesheets/extra.css`.
- Keep `docs/CNAME` as `cyberwithcj.com` for the custom domain.
- Keep `README.md` and `LICENSE` in the repository.

The main page is `docs/index.md`. Section landing pages are in folders such as `docs/networking/index.md` and `docs/tools/index.md`.

To add a page, create a Markdown file under `docs/` and add it to the `nav` section of `mkdocs.yml`.

## 5. Build exactly as GitHub Actions does

Before publishing, run:

```powershell
python -m mkdocs build --strict
```

The generated static files are written to `site/`. The `site/` directory is generated output and does not need to be edited by hand.

## 6. Publish

Review the changes, commit and push them to the `main` branch. The workflow in `.github/workflows/deploy.yml` then builds and deploys the site through GitHub Pages.

In the repository settings, use **Pages → Build and deployment → Source → GitHub Actions**.
