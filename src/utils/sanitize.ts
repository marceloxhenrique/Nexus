import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input);
}

export function sanitizeArticleSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD") // Step 1: Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Step 2: Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Step 3: Remove special characters
    .replace(/\s+/g, "-") // Step 4: Replace spaces with dashes
    .replace(/-+/g, "-") // Step 5: Collapse multiple dashes
    .replace(/^-+|-+$/g, ""); // Step 6: Trim dashes at ends
}
