import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pkctechs.in';

  const routes = [
    '',
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
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
