import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // exclude aqui é só para arquivos de teste
    exclude: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      ".eslintrc.{js,cjs,mjs,ts}",
      ".prettierrc.{js,cjs,mjs,ts}",
      ".editconfig.{js,cjs,mjs,ts}",
      ".config.{js,cjs,mjs,ts}",
      "vitest.config.{js,ts}",
    ],

    // coverage.exclude é para excluir do relatório de cobertura
    coverage: {
      exclude: [
        // Dependências
        "node_modules/**",

        // Build/dist
        "dist/**",
        "build/**",
        "coverage/**",

        // Config files
        "**/*.config.{js,ts}",
        "vite.config.*",
        "vitest.config.*",

        // Types
        "**/*.d.ts",
        "src/types/**",

        // Database
        "src/migrations/**",
        "src/seeds/**",
        "prisma/**",

        // Arquivos de setup
        "src/server.{js,ts}",
        "src/app.{js,ts}",
        "src/main.{js,ts}",

        // Barrel exports
        "**/index.{js,ts}",

        // config files
        ".eslintrc.{js,cjs,mjs,ts}",
        ".prettierrc.{js,cjs,mjs,ts}",
        ".editconfig.{js,cjs,mjs,ts}",
        ".config.{js,cjs,mjs,ts}",
        "vitest.config.{js,ts}",
      ],
    },
  },
});
