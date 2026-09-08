import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Water-AI customer read-only web
 * Quartz v4 pinned by the bootstrap/build scripts.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Water-AI Project",
    pageTitleSuffix: " · Read Only",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ko-KR",
    baseUrl: process.env.QUARTZ_BASE_URL ?? "water-ai.pages.dev",
    ignorePatterns: [
      ".obsidian",
      ".web",
      "90-템플릿",
      "**/10-받은자료/**",
      "_WEB-BUILD-REPORT.json",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans KR",
        body: "Noto Sans KR",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fafafa",
          lightgray: "#e5e7eb",
          gray: "#9ca3af",
          darkgray: "#374151",
          dark: "#111827",
          secondary: "#1f4e79",
          tertiary: "#64748b",
          highlight: "rgba(31, 78, 121, 0.12)",
          textHighlight: "#fff3a688",
        },
        darkMode: {
          light: "#111827",
          lightgray: "#1f2937",
          gray: "#6b7280",
          darkgray: "#d1d5db",
          dark: "#f9fafb",
          secondary: "#93c5fd",
          tertiary: "#cbd5e1",
          highlight: "rgba(147, 197, 253, 0.12)",
          textHighlight: "#8a7c1f88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: false,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
