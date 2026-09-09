import { MetadataRoute } from 'next';
import { guidesData } from '@/data/guidesData';
import { blogPosts } from '@/data/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pkctechs.in';

  const toolRoutes = [
    '',
    '/tools/image-generator',
    '/tools/image-analyzer',
    '/tools/pdf-chat',
    '/tools/text-summarizer',
    '/tools/image-resizer',
    '/tools/image-converter',
    '/tools/image-compressor',
    '/tools/background-remover',
    '/tools/image-cropper',
    '/tools/image-to-pdf',
    '/tools/pdf-to-image',
    '/tools/pdf-compressor',
    '/tools/merge-pdf',
    '/tools/split-pdf',
    '/tools/pdf-to-docx',
    '/tools/docx-to-pdf',
    '/tools/format-converter',
    '/tools/qr-generator',
    '/tools/svg-to-png',
    '/tools/color-picker',
    '/tools/password-generator',
    '/tools/base64-tool',
    '/tools/json-formatter',
    '/tools/youtube-video-downloader',
    '/tools/youtube-thumbnail-downloader',
  ];

  const guideRoutes = [
    '/guides',
    ...Object.keys(guidesData).map((slug) => `/guides/${slug}`),
  ];

  const blogRoutes = [
    '/blog',
    ...Object.keys(blogPosts).map((slug) => `/blog/${slug}`),
  ];

  const complianceRoutes = [
    '/about',
    '/privacy',
    '/terms',
    '/contact',
  ];

  const toolEntries = toolRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : 0.9,
  }));

  const guideEntries = guideRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/guides' ? 0.8 : 0.85,
  }));

  const blogEntries = blogRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/blog' ? 0.85 : 0.8,
  }));

  const complianceEntries = complianceRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...toolEntries, ...guideEntries, ...blogEntries, ...complianceEntries];
}


