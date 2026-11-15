# Cyber With CJ

Personal cybersecurity notes and practical references covering networking, Linux,
web and API security, penetration testing, Active Directory, tools, and authorised
labs.

Read the published site at **[cyberwithcj.com](https://cyberwithcj.com)**.

## Contents

- [Portfolio](docs/portfolio/index.md)
- [About](docs/about.md)
- [Networking](docs/networking/index.md)
- [Linux](docs/linux/index.md)
- [Web security](docs/web-security/index.md)
- [API security](docs/api-security/index.md)
- [Penetration testing](docs/penetration-testing/index.md)
- [Active Directory](docs/active-directory/index.md)
- [Tools](docs/tools/index.md)
- [Cheatsheets](docs/cheatsheets/index.md)
- [Labs](docs/labs/index.md)
- [Visitor counter](docs/visitor-counter.md)

## Run locally

The site is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).
See [RUNNING-LOCALLY.md](RUNNING-LOCALLY.md) for installation, live preview, and
strict build instructions. After activating a virtual environment, run:

```powershell
python -m pip install -r requirements.txt
python -m mkdocs serve --strict
```

## Visitor counter

The homepage includes a **People who opened this site** counter immediately
after the Labs cards. It records an approximate site visit (at most one count
per browser every 24 hours) through the external
[CountAPI](https://countapi.mileshilliard.com/) service. The count is stored by
that service, not in the generated `site/` folder, so rebuilding MkDocs,
relaunching the site, or pushing normal content changes does not reset it.

The active counter key is the `COUNTER_KEY` constant in
[`docs/javascripts/visitor-counter.js`](docs/javascripts/visitor-counter.js).
Do not generate a new key as part of a build or deployment.

### Reset the counter (owner command)

Resetting is an explicit key rotation. From the repository root, run:

```powershell
pwsh -File .\scripts\reset-visitor-counter.ps1 -ConfirmReset
# Windows PowerShell 5.1: powershell -ExecutionPolicy Bypass -File .\scripts\reset-visitor-counter.ps1 -ConfirmReset
```

Review the changed key, then commit and push it so GitHub Pages deploys the new
counter:

```powershell
git add docs/javascripts/visitor-counter.js
git commit -m "Reset visitor counter"
git push
```

The script is the supported reset path for this site. It leaves the old remote
counter intact and starts a fresh counter with the next deployment; ordinary
builds never rotate the key. CountAPI keys are long-lived, so rotating the
active key is safer than mutating the old public value. Because GitHub Pages is
static, the browser-facing
counter key is necessarily public, so this is an owner-controlled operational
reset rather than a security boundary. A cryptographically owner-only reset
would require an authenticated server or worker instead of static Pages. The
number is an approximate visit signal, not a guarantee of unique human
visitors.

## Scope and responsible use

These notes are for education and defensive security work. Follow the
authorisation and scope requirements on each page, and test only systems you own
or have explicit permission to assess.

The site source is available under the [MIT License](LICENSE).
