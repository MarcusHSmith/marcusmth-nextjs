---
path: blog
date: "2026-09-16T09:00:00.000Z"
lastUpdated: "2026-09-16T09:00:00.000Z"
title: Setting up a New Mac for Development
description: My checklist for turning a fresh Mac into a working development machine — password manager, Homebrew, Node, GitHub SSH, and the settings worth changing first.
tags: ["macos", "software-engineering", "developer-tools"]
isPublished: true
---

Every new Mac gets the same treatment. This is the checklist for going from sealed box to a working development machine.

## First: the basics

**Apple ID + iCloud.** Sign in, let Keychain sync. Half the setup below depends on synced credentials.

**1Password.** Install before anything that needs a login. The browser extension goes in next — every subsequent sign-in pulls from the vault instead of my memory.

**System settings worth changing first** (tune to taste — starting points, not gospel):
- Trackpad: turn on tap-to-click, bump tracking speed up
- Keyboard: faster key repeat, shorter delay until repeat
- Finder: show the path bar and status bar; new windows open at the home folder
- Dock: auto-hide on, magnification off

## Development

**Xcode Command Line Tools.** `xcode-select --install`. You need these before Homebrew works properly.

**Homebrew.** Install from [brew.sh](https://brew.sh). Then:

```bash
brew install git node
```

**NVM and Node.** I use [NVM](https://github.com/nvm-sh/nvm) rather than a single system Node so projects can pin their own versions:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
nvm install --lts
```

**GitHub SSH.** Generate a key and add it to the ssh-agent per [GitHub's docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent), then add the public key to your GitHub account. HTTPS clones with credential helpers work, but SSH is one setup and then it's invisible.

**Editor + terminal.** VS Code (with Settings Sync signed in — extensions and keybindings follow you), and whatever terminal you actually like. I don't fight the default Terminal long; pick yours and move on.

## Verify it works

```bash
git --version && node --version && brew --version
ssh -T git@github.com
```

If the SSH handshake greets you by username, the machine is done. Everything after this is project-specific.

## What to skip

- Wholesale Migration Assistant migration. Fresh installs beat it here — Migration Assistant carries over years of cruft. (If you'd rather trade cleanliness for speed, migrate and skip the rest of this list.)
- Customizing the shell before writing code. Get the machine shipping something first — prompt theme can wait.
