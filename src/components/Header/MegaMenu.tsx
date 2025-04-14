"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

export interface NavItemProps {
  title: string;
  href: string;
  child?: {
    left_image?: {
      path: string;
      href: string;
    };
    menu: {
      title: string;
      href: string;
      description?: string;
    }[];
  };
}

export const NavList: NavItemProps[] = [
  {
    title: "Face",
    href: "/products?p_category=makeup&c_category=face",
    child: {
      left_image: {
        path: "/menu/dl-bloom.jpg",
        href: "/products/lois-chloe-dl-bloom-palette-blush",
      },
      menu: [
        {
          title: "Foundation",
          href: "/products?p_category=makeup&c_category=face&n_category=foundation",
          description:
            "Achieve a smooth, even complexion with our long-lasting foundations.",
        },
        {
          title: "Concealer",
          href: "/products?p_category=makeup&c_category=face&n_category=concealer",
          description:
            "Cover imperfections effortlessly for a flawless, natural look.",
        },
        {
          title: "Blush",
          href: "/products?p_category=makeup&c_category=face&n_category=blush",
          description:
            "Add a healthy, radiant glow to your cheeks with our vibrant blush shades.",
        },
        {
          title: "Highlighters",
          href: "/products?p_category=makeup&c_category=face&n_category=highlighters",
          description:
            "Illuminate your best features with a stunning, radiant glow.",
        },
        {
          title: "Loose-powder",
          href: "/products?p_category=makeup&c_category=face&n_category=loose-powder",
          description:
            "Set your makeup and control shine for a soft, matte finish.",
        },
      ],
    },
  },
  {
    title: "Lips",
    href: "/products?p_category=makeup&c_category=lips",
    child: {
      left_image: {
        path: "/menu/lipstick.jpeg",
        href: "/products?p_category=makeup&c_category=lips",
      },
      menu: [
        {
          title: "Matte Lipstick",
          href: "/products?p_category=makeup&c_category=lips&n_category=bullet",
          description:
            "Bold, long-lasting color with a smooth, shine-free finish.",
        },
        {
          title: "Semi Matte Lipstick",
          href: "/products?p_category=makeup&c_category=lips&n_category=semi-matte",
          description:
            "A perfect balance of matte and moisture for a soft, velvety look.",
        },
        {
          title: "Liquid Lipstick",
          href: "/products?p_category=makeup&c_category=lips&n_category=liquid",
          description:
            "Intense pigment with a lightweight, smudge-proof formula.",
        },
      ],
    },
  },
  {
    title: "Eyes",
    href: "/products?p_category=makeup&c_category=eyes",
    child: {
      left_image: {
        path: "/menu/Mascara.jpeg",
        href: "/products/lois-chloe-perfect-lash-mascara",
      },
      menu: [
        {
          title: "Eyeliner",
          href: "/products?p_category=makeup&c_category=eyes&n_category=eyeliner",
          description:
            "Bold, long-lasting color with a smooth, shine-free finish.",
        },
        {
          title: "Mascara",
          href: "/products?p_category=makeup&c_category=eyes&n_category=mascara",
          description:
            "A perfect balance of matte and moisture for a soft, velvety look.",
        },
        {
          title: "Eyeshadow Palette",
          href: "/products?p_category=makeup&c_category=eyes&n_category=eyeshadow-palette",
          description:
            "Intense pigment with a lightweight, smudge-proof formula.",
        },
      ],
    },
  },
  {
    title: "Makeup Tools",
    href: "/products?p_category=makeup&c_category=tools-%26-brushes",
    child: {
      left_image: {
        path: "/menu/brush-set.png",
        href: "/products/lois-chloe-signature-brush-set",
      },
      menu: [
        {
          title: "Brush Sets",
          href: "/products?p_category=makeup&c_category=tools-%26-brushes&n_category=brush-sets",
          description:
            "Ultra-soft, high-quality brushes for flawless makeup application. 💖✨",
        },
      ],
    },
  },
  {
    title: "Personal Care",
    href: "/products?p_category=personal-care",
    child: {
      left_image: {
        path: "/menu/sunscreen.jpg",
        href: "/products/lois-chloe-sunscreen-cream",
      },
      menu: [
        {
          title: "Sunscreen Cream",
          href: "/products?p_category=personal-care&c_category=sunscreen",
          description:
            "Protect your skin with lightweight, SPF-infused defense. ☀️🛡️ ",
        },
        {
          title: "Moisturizer",
          href: "/products?p_category=personal-care&c_category=moisturizer",
          description:
            "Hydrate and nourish your skin for a soft, glowing look. ✨💧",
        },
      ],
    },
  },
  {
    title: "Offers",
    href: "/products?p_category=offer",
    child: {
      left_image: {
        path: "/menu/Combo.jpeg",
        href: "/products?p_category=offer",
      },
      menu: [
        {
          title: "Combo",
          href: "/products?p_category=offer&c_category=combo",
          description:
            "Perfectly paired beauty essentials at unbeatable prices! ✨💖",
        },
      ],
    },
  },
];

export function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NavList?.map((navItem) => {
          return !navItem?.child ? (
            <NavigationMenuItem key={navItem.title}>
              <Link href={navItem.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {navItem.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : (
            <React.Fragment key={navItem.title}>
              {navItem.child?.left_image ? (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{navItem.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <a
                        className="row-span-3"
                        href={navItem.child.left_image.href}
                      >
                        <NavigationMenuLink asChild>
                          <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted  no-underline outline-none focus:shadow-md">
                            <Image
                              src={navItem.child.left_image.path}
                              alt={navItem.title}
                              width={500}
                              height={500}
                              className="w-[400px]"
                            />
                          </div>
                        </NavigationMenuLink>
                      </a>
                      {navItem.child.menu.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        >
                          {item?.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{navItem.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {navItem.child.menu.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}
            </React.Fragment>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
