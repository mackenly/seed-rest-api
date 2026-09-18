# seed-rest-api
An API for getting pseudo-random seeds

I can't think of any real-world use cases for this, but seed.rest is a cool domain, so put this together.

## Development
Requires Rust with the `wasm32-unknown-unknown` target (`rustup target add wasm32-unknown-unknown`).

In the project's directory run:
- `npm install` — install Wrangler
- `npm run dev` — run the project locally
- `npm run deploy` — publish the project to Cloudflare Workers
