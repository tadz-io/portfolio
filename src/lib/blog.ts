// src/lib/blog.ts

export interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
  };
}

// Dummy implementation; replace with your actual data fetching logic
export async function getBlogPosts(): Promise<BlogPost[]> {
  return [
    {
      slug: "hello-world",
      metadata: {
        title: "Hello World",
        publishedAt: "2024-06-01",
        summary: "This is the first blog post.",
      },
    },
  ];
}
