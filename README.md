# KPuff site: editable Starter structure (pilot)

This is the barber site rebuilt so a non-technical owner can edit it. Visually it is
identical to the original single-file version (checked by rendering both at phone width
and comparing pixels: no differences).

## How it's organized

| Path | What it is | Who touches it |
| --- | --- | --- |
| `content/site.json` | All wording, prices, services, links, phone number | Owner (through the editor) |
| `images/` | Photos | Owner (through the editor) |
| `src/template.html`, `src/styles.css`, `src/booking.js` | Layout, design, booking-form logic | You only |
| `build.js` | Combines the content and the layout into the final page | You only |
| `.pages.yml` | Tells the editor which fields to show | You only |
| `dist/` | The finished site (created by the build, not stored in GitHub) | Nobody |

Changing a service name in the editor also changes the booking form's Service menu.
Leaving a gallery photo empty shows the "photo coming soon" tile.

## Try it on your computer

    node build.js        # creates dist/
    # open dist/index.html in a browser

## Deploy (Cloudflare Pages), one time per client

1. Put this folder in a GitHub repository (the client's own GitHub account, with you added as a collaborator).
2. In Cloudflare: Workers & Pages > Create > Pages > Connect to Git, and pick the repository.
3. Build settings: **Build command** `node build.js`, **Build output directory** `dist`.
4. After the first deploy, add the client's custom domain under the project's Custom domains tab.

From then on, every saved change in GitHub rebuilds and republishes the site automatically.

## Turn on the editor (Pages CMS)

Follow the Pages CMS Quick start (pagescms.org/docs/quick-start/). `.pages.yml` is already
written, so the main steps are signing in with GitHub, choosing the repository, and
opening "Website content".

## Not yet tested (do before promising this to a client)

- The Pages CMS sign-in and save flow has not been run against this repository. The build,
  the page, and the way edits flow into the page have been tested; the editor screens have not.
- Confirm the editor works with the repository type you choose (public vs private) before you quote it.
- `bookingPhone` and `messengerLink` are still empty, as in the original. Until they are set,
  booking requests are copied to the clipboard instead of opening a text message.

## What was added beyond the original

- A Google description (`metaDescription`) in the page head. The original had none; edit the wording as you like.
- Photos load lazily (they load as the visitor scrolls). Nothing else about the design changed.
