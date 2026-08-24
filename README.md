# Storeflow — Dashboard e-commerce

Base de dashboard construite avec Nuxt 4, Vue 3 et TypeScript. L’interface actuelle contient la vue d’ensemble : indicateurs clés, ventes, activité récente et commandes.

## Démarrer le projet

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

L’application est ensuite disponible sur `http://localhost:3000`.

## Architecture

```text
app/
├── app.vue                  # Point d’entrée et montage du layout
├── assets/css/main.css      # Design system et responsive global
├── assets/css/theme.css     # Thèmes clair/sombre et composants UI
├── components/ui/           # Composants génériques réutilisables
├── components/dashboard/    # Widgets propres au dashboard
├── components/layout/       # Éléments du shell et de navigation
├── layouts/default.vue      # Shell partagé : sidebar, topbar, navigation
└── pages/                   # Écrans du dashboard
public/                      # Assets statiques
nuxt.config.ts               # Configuration Nuxt, SEO et TypeScript
```

Le thème est géré par `@nuxtjs/color-mode` avec détection système par défaut. Le bouton dans la topbar permet de passer directement du thème clair au thème sombre. Le graphique des ventes utilise `vue-chartjs` et `chart.js`, avec animation d’entrée, tooltip et adaptation automatique aux couleurs du thème.

Les composants `AppButton`, `AppCard`, `StatusBadge`, `UserAvatar`, `ThemeToggle`, `StatCard` et `SalesChart` sont auto-importés par Nuxt et peuvent être utilisés dans toutes les pages. Les conventions prévues pour la suite sont `app/composables/` pour la logique réutilisable, `app/stores/` pour l’état partagé, `app/types/` pour les modèles TypeScript et `server/api/` pour les endpoints Nuxt.

Les données de la page d’accueil sont locales pour garder cette première base autonome. La prochaine étape est de créer les pages `orders`, `products`, `customers`, puis de remplacer ces données par des composables connectés à `server/api`.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
