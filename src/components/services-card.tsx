"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon, LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import React from "react";

type LucideIconIndex = { [key: string]: React.ComponentType<LucideIcons.LucideProps> };

interface ServicesCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  description?: string;
}
export const ServicesCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  description,
}: ServicesCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description || location) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const isUrl = (str: string): boolean => {
    try {
      // A more robust URL check could be used, but this covers common cases for local and remote URLs.
      return str.startsWith("/") || str.startsWith("http://") || str.startsWith("https://") || new URL(str).protocol.startsWith("http");
    } catch (_) {
      return false;
    }
  };

  const renderLogoContent = () => {
    if (isUrl(logoUrl)) {
      return (
        <>
          <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
          <AvatarFallback>{altText ? altText.substring(0, 2) : "L"}</AvatarFallback>
        </>
      );
    } else {
      // Attempt to render a Lucide icon by its string name
      const IconComponent = (LucideIcons as any)[logoUrl] as React.ComponentType<LucideIcons.LucideProps>;
      if (IconComponent) {
        return <IconComponent className="size-10 text-primary" />; // Adjust size/color as needed
      }
      // Fallback if the string is not a URL and not a recognized Lucide icon name
      return <AvatarFallback>{altText ? altText.substring(0, 2) : "L"}</AvatarFallback>;
    }
  };

  return (
    <Card className="flex">
      <div className="flex-none">
        <Avatar className="size-12 m-auto bg-muted-background flex items-center justify-center">
            {renderLogoContent()}
        </Avatar>
      </div>
      <div className="flex-grow ml-4 items-center flex-col group">
        <Link
          href={href || "#"}
          className="block cursor-pointer mt-2"
          onClick={handleClick}
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-md sm:text-md">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-xs"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
            </div>
            {subtitle && <div className="font-sans text-sm text-muted-foreground">{subtitle}</div>}
          </CardHeader>
        </Link>
        {(description || location) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? "auto" : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-2 text-xs sm:text-sm whitespace-pre-line"
          >
            {description && (
              // Use dangerouslySetInnerHTML for the description
              <div dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );
};
