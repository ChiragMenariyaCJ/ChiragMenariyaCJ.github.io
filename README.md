# Cyber With CJ

Personal cybersecurity notes and practical references covering networking, Linux,
web and API security, penetration testing, Active Directory, tools, and authorised
labs.

Read the published site at **[cyberwithcj.com](https://cyberwithcj.com)**.

## Contents

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

## Run locally

The site is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).
See [RUNNING-LOCALLY.md](RUNNING-LOCALLY.md) for installation, live preview, and
strict build instructions. After activating a virtual environment, run:

```powershell
python -m pip install -r requirements.txt
python -m mkdocs serve --strict
```

## Scope and responsible use

These notes are for education and defensive security work. Follow the
authorisation and scope requirements on each page, and test only systems you own
or have explicit permission to assess.

The site source is available under the [MIT License](LICENSE).
