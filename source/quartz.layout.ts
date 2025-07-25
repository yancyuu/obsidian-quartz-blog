import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"


// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
  	Component.Explorer({
    	filterFn: (node) => {
      	const name = node.displayName.toLowerCase();
        const pathParts = name.split(/[/\\]/); // 同时处理 / 和 \
      // 🔍 调试：看看实际数据
            console.log('displayName:', node.displayName);
            console.log('pathParts:', pathParts);	
	// 🚫 隐藏这些内容
      	if (pathParts.includes('excalid') ||
          pathParts.includes('images')||
          name.endsWith('.png') ||
          name.endsWith('.jpg') ||
          name.endsWith('.svg')) {
        return false;
      }

      return true;
    }
  })
),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
  	Component.Explorer({
    	filterFn: (node) => {
      	const name = node.displayName.toLowerCase();
        const pathParts = name.split(/[/\\]/); // 同时处理 / 和 \
	// 🔍 调试：看看实际数据
            console.log('displayName:', node.displayName);
            console.log('pathParts:', pathParts);

	// 🚫 隐藏这些内容
      	if (pathParts.includes('excalid') ||
          pathParts.includes('images')||
          name.endsWith('.png') || 
          name.endsWith('.jpg') || 
          name.endsWith('.svg')) {
        return false;
      }
      
      return true;
    }
  })
),
  ],
  right: [],
}
