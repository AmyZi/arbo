import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
<<<<<<< HEAD
      url: `${siteConfig.url}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
=======
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: now,
<<<<<<< HEAD
      changeFrequency: 'weekly',
=======
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
      priority: 0.8,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
<<<<<<< HEAD
    lastModified: new Date(post.date),
=======
    lastModified: post.date ? new Date(post.date) : now,
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
<<<<<<< HEAD
}
=======
}
>>>>>>> e164d5adc168fdd8bd752b2b4c7d6820a908e804
