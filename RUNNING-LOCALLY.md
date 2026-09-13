# Run and edit Cyber With CJ locally

This guide covers the local edit, preview, and validation workflow for the MkDocs site. The deployment workflow uses Python 3.13, so that version is the safest choice for local builds.

## Prerequisites

Install the following before starting:

- Python 3.13 or another supported Python 3 release
- Git
- A terminal and editor

## Clone and open the repository

Replace the path with the directory where you keep projects:

```powershell
git clone https://github.com/ChiragMenariyaCJ/ChiragMenariyaCJ.github.io.git
Set-Location ChiragMenariyaCJ.github.io
```

If you already have a checkout, open a terminal in its root directory (the directory containing `mkdocs.yml`).

## Create a virtual environment

A virtual environment keeps the site dependencies separate from other Python projects. In PowerShell on Windows, run:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

If PowerShell blocks activation, allow it for the current terminal session and try again:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

On macOS or Linux, use the equivalent commands:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Activate the environment again whenever you open a new terminal. Your prompt usually shows `(.venv)` when it is active.

## Start the live preview

From the repository root, run:

```powershell
python -m mkdocs serve --strict
```

Open <http://127.0.0.1:8000/> in your browser. MkDocs rebuilds the preview when you save a documentation or configuration file. Stop the server with **Ctrl+C**.

If port 8000 is already in use, choose another local port:

```powershell
python -m mkdocs serve --strict --dev-addr 127.0.0.1:8001
```

## Edit the site

- Add or update pages in `docs/`.
- Update navigation, theme settings, and features in `mkdocs.yml`.
- Update visual styling in `docs/stylesheets/extra.css`.
- Update interactive behaviour in `docs/javascripts/`.
- Keep `docs/CNAME` set to `cyberwithcj.com` for the custom domain.
- Keep `README.md` and `LICENSE` in the repository.

The home page is `docs/index.md`. Section landing pages are in directories such as `docs/networking/index.md` and `docs/tools/index.md`. To add a page, create a Markdown file under `docs/` and add it to the `nav` section of `mkdocs.yml`.

## Build exactly as GitHub Actions does

Before opening a pull request or pushing to `main`, run:

```powershell
python -m mkdocs build --strict --clean
```

The generated static files are written to `site/`. This directory is ignored by Git and should not be edited or committed by hand. A strict build must complete successfully; resolve any MkDocs warnings it reports.

## Publish

Review the build, commit your changes, and push them to the `main` branch. The workflow in `.github/workflows/deploy.yml` then builds and deploys the site through GitHub Pages.

In the repository settings, select **Pages > Build and deployment > Source > GitHub Actions**. The first deployment may take a few minutes to become available at <https://cyberwithcj.com>.

## Troubleshooting

- **`No module named mkdocs`:** activate `.venv` and reinstall `requirements.txt`.
- **`python` is not recognised on Windows:** install Python and enable the command-line launcher, then recreate `.venv`.
- **The strict build reports a warning:** fix the reported Markdown, navigation, or configuration issue and run the build again.
- **The preview does not update:** stop the server, confirm you are in the repository root, and run the serve command again.
