import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { DATA } from "./resume"; // Import DATA from resume.tsx

// Define the structure of your frontmatter
type FrontmatterMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string; // Optional image directly in frontmatter if you ever need it
  // Add any other fields you expect in your frontmatter
};

// Define the structure of the metadata object that getPost will return
// This includes frontmatter and any additional data like project assets
export type PostMetadata = FrontmatterMetadata & {
  projectImage?: string; // Image from the corresponding project
  projectVideo?: string; // Video from the corresponding project
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string) {
  const filePath = path.join("content", `${slug}.mdx`);
  let source;
  try {
    source = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null; // Or throw an error, or handle as "not found"
  }

  const { content: rawContent, data } = matter(source);
  // Assert the type of the parsed frontmatter
  const frontmatter = data as FrontmatterMetadata;

  // Initialize the metadata object for the post
  const postMetadata: PostMetadata = {
    ...frontmatter, // Spread the fields from frontmatter
  };

  // Find the corresponding project in DATA.projects by slug
  // Ensure the project object actually has a 'slug' property before comparing
  const project = DATA.projects.find(
    (p) => "slug" in p && p.slug === slug
  );

  if (project) {
    if ("image" in project && project.image) {
      postMetadata.projectImage = project.image;
    }
    if ("video" in project && project.video) {
      postMetadata.projectVideo = project.video;
    }
  }

  const htmlContent = await markdownToHTML(rawContent);

  return {
    source: htmlContent,
    metadata: postMetadata,
    slug,
  };
}

async function getAllPosts(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      // getPost can return null if file not found or error
      const postData = await getPost(slug);
      return postData;
    })
  );
  // Filter out any null results if getPost can return null
  return posts.filter(post => post !== null) as { metadata: PostMetadata; slug: string; source: string }[];
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
