import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string; // This is the primary link for the entire card, set by the parent page
  description: string;
  dates: string;
  tags: readonly string[]; // In page.tsx, pass project.technologies as tags
  link?: string; // For the print-visible link
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  slug?: string; // The project's slug, used for linking to blog posts
}

export function ProjectCard({
  title,
  href, // Main link for the card (and title), determined in page.tsx
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  slug, // Project's slug
}: Props) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      <Link
        href={href || "#"} // Entire card links to what's passed in href prop
        className={cn("block cursor-pointer", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && !video && ( // Only show image if no video
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">
            {/* Title also links to the card's main href */}
            <Link href={href || "#"}>{title}</Link>
          </CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2 pt-1">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((itemLink, idx) => {
              let determinedHref = itemLink.href; // Default to the href specified in the links array item
              let determinedTarget = "_blank";    // Default target

              const linkTypeLower = itemLink.type.toLowerCase();

              if (linkTypeLower === "case study" && slug) {
                determinedHref = `/blog/${slug}`;
                determinedTarget = "_self"; // Internal blog link
              } else {
                // For "Website", "Source", or "Case study" without a slug, etc.
                // Use itemLink.href. Determine target based on its nature.
                // If itemLink.href (which is now determinedHref) starts with "/" or "#", it's internal.
                if (determinedHref.startsWith("/") || determinedHref.startsWith("#")) {
                  determinedTarget = "_self";
                }
                // Otherwise, it's an external link, and target remains "_blank".
              }

              // For "Website" type, determinedHref is already itemLink.href.
              // Based on your data, itemLink.href for "Website" type buttons
              // is the project's main website URL (project.href from DATA).

              return (
                <Link href={determinedHref} key={idx} target={determinedTarget} rel="noopener noreferrer">
                  <Badge className="flex gap-2 px-2 py-1 text-[10px] items-center">
                    {itemLink.icon}
                    {itemLink.type}
                  </Badge>
                </Link>
              );
            })}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
