# CMS Improvement Roadmap

Based on the current architecture and user needs, here are the recommended improvements to take the Website CMS to the next level.

## 1. Rich Text Editing (High Impact)
**Current:** Basic text areas for blog posts and descriptions.
**Improvement:** Integrate a WYSIWYG editor like **TipTap** or **Quill**.
**Benefit:** Allows formatting (bold, italic, lists), image embedding directly in text, and headers for better content creation.

## 2. Media Manager Upgrade
**Current:** Basic URL input or single file upload.
**Improvement:** A dedicated Media Library modal that allows:
-   Drag-and-drop multiple uploads
-   Folder organization
-   Image optimization (auto-conversion to WebP)
-   Selecting previously uploaded images

## 3. SEO Real-Time Preview
**Current:** Text inputs for meta tags.
**Improvement:** A visual component that mimics a Google Search Result.
**Benefit:** Users can see exactly how their title and description will look on Google before publishing.

## 4. Live Visual Preview
**Current:** Edit in admin, check in separate tab.
**Improvement:** Split-screen view where saving settings instantly updates an iframe preview of the site.
**Benefit:** Immediate feedback loop for design changes.

## 5. Drag-and-Drop Page Builder
**Current:** Fixed sections (Hero, Services, FAQ).
**Improvement:** "Content Blocks" system. Allow users to add, remove, and reorder generic blocks (e.g., "Image Left, Text Right", "Call to Action", "Gallery", "Newsletter").
**Benefit:** Infinite layout possibilities without code changes.

## 6. Version History & Rollback
**Current:** Single state of truth.
**Improvement:** Store previous versions of the `masterConfig` JSON.
**Benefit:** Safety net. If a design breaks, click "Undo" to revert to yesterday's version.

## 7. Role-Based CMS Access
**Current:** Super Admin has full access.
**Improvement:** Granular permissions (e.g., "Content Editor" can only touch Blog, "Designer" can only touch Theme).

## 8. Multi-Language Support (i18n)
**Current:** Single language strings.
**Improvement:** CMS structure to support `en`, `es`, `fr` variants for all text fields.
