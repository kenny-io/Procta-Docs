# Procta Documentation

Developer documentation for the Procta trust and attestation platform — KYA identity, verifiable credentials, real-time verification, and audit trails for autonomous financial agents.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3040](http://localhost:3040).

## Project Structure

```
docs.json              # Navigation config — tabs, groups, page order, API reference
openapi.yaml           # Procta OpenAPI 3.1 spec (auto-generates the API Reference tab)
src/
  content/             # MDX documentation pages
    introduction.mdx
    quickstart.mdx
    authentication.mdx
    verification.mdx
    credentials.mdx
    ...
    guides/            # In-depth guides for owners and relying parties
  app/                 # Next.js App Router
  components/          # Layout, navigation, MDX, and UI primitives
  data/
    site.ts            # Site name, description, links, brand colors
  styles/
    brand.css          # Procta orange brand tokens
```

## Production

```bash
npm run build
npm start
```

## License

MIT
