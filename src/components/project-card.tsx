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
  href?: string; // This will be the primary link for the card (e.g., to blog post or project site)
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string; // For the print-visible link
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  slug?: string; // Add slug to props
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  slug, // Destructure slug
}: Props) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      <Link
        href={href || "#"} // Main card link, determined by parent component
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
            <Link href={href || "#"}>{title}</Link> {/* Title also links */}
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
      <CardFooter className="px-2 pb-2 pt-1"> {/* Added pt-1 for a bit of top padding */}
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((itemLink, idx) => {
              let buttonHref = itemLink.href;
              // Check if this link type should point to the blog post
              const linkTypeLower = itemLink.type.toLowerCase();
              if ((linkTypeLower === "website" || linkTypeLower === "demo" || linkTypeLower === "live") && slug) {
                buttonHref = `/blog/${slug}`;
              }

              return (
                <Link href={buttonHref} key={idx} target={slug && (linkTypeLower === "website" || linkTypeLower === "demo" || linkTypeLower === "live") ? "_self" : "_blank"} rel="noopener noreferrer">
                  <Badge className="flex gap-2 px-2 py-1 text-[10px] items-center"> {/* Added items-center */}
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
