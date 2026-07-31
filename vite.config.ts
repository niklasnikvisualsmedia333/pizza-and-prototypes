import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

function previewHtmlPlugin(isPreview: boolean): Plugin {
  return {
    name: 'preview-html-safety',
    transformIndexHtml(html) {
      if (!isPreview) {
        return html;
      }

      return html
        .replace(/\s*<!-- Cloudflare Web Analytics -->[\s\S]*?<!-- End Cloudflare Web Analytics -->/g, '')
        .replace(/\s*<link\s+rel="canonical"[^>]*>/g, '')
        .replace(/\s*<link\s+rel="alternate"[^>]*>/g, '')
        .replace(/\s*<meta\s+property="og:url"[^>]*>/g, '')
        .replace('</head>', '    <meta name="robots" content="noindex,nofollow,noarchive" />\n  </head>');
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isPreview = env.VITE_SITE_ENV === 'preview';

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), tailwindcss(), previewHtmlPlugin(isPreview)],
    build: {
      rollupOptions: {
        input: {
          community: resolve(__dirname, 'index.html'),
          companies: resolve(__dirname, 'companies/index.html'),
        },
      },
    },
  };
});
