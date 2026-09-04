export interface GuideSection {
  heading: string;
  content: string[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  publishDate: string;
  readingTime: string;
  toolSlug: string;
  toolName: string;
  category: "PDF" | "Image" | "Web";
  sections: GuideSection[];
  tips: string[];
  faqs: { question: string; answer: string }[];
}

export const guidesData: Record<string, GuideArticle> = {
  "how-to-compress-pdf-to-200kb": {
    slug: "how-to-compress-pdf-to-200kb",
    title: "How to Compress PDF to Under 200KB for Online Applications",
    metaTitle: "How to Compress PDF to 200KB Free Online | Step-by-Step Guide",
    description: "Learn how to compress your PDF files under 200KB or 500KB for government job portals, university admissions, and visa applications without losing text clarity.",
    publishDate: "2026-03-01",
    readingTime: "4 min read",
    toolSlug: "pdf-compressor",
    toolName: "PDF Compressor",
    category: "PDF",
    sections: [
      {
        heading: "Why Do Portals Require Under 200KB PDFs?",
        content: [
          "Most government application portals, state exam registration systems, and university admissions websites enforce strict upload file size caps—commonly 200KB or 500KB. This restriction ensures that millions of applicant documents can be processed and archived without overwhelming government servers.",
          "However, scanning diplomas, transcripts, or certificates on standard mobile phone scanners often produces PDF files exceeding 2MB to 5MB, resulting in upload rejection errors.",
        ],
      },
      {
        heading: "How to Compress Your PDF in 3 Simple Steps",
        content: [
          "1. Open our Free PDF Compressor: Navigate directly to the pkctechs PDF Compressor tool in your browser.",
          "2. Upload Your PDF File: Drag and drop your scanned document or certificate into the secure box.",
          "3. Choose Compression & Download: Select the compression level. The tool removes redundant metadata and optimizes embedded raster images while keeping text razor-sharp. Click download to get your compliant file.",
        ],
      },
      {
        heading: "Is It Safe to Compress Sensitive Documents?",
        content: [
          "When uploading passports, ID cards, tax forms, or educational certificates, data privacy is critical. Unlike traditional cloud converters that upload your confidential files to remote servers, pkctechs processes everything locally inside your browser memory. Your documents are never uploaded, stored, or viewed by anyone.",
        ],
      },
    ],
    tips: [
      "Scan in Grayscale or Black & White if color is not explicitly mandatory; this drastically lowers file size.",
      "Check font embedding: Vector text uses minimal kilobytes compared to scanned image-only PDFs.",
      "Always inspect your compressed PDF before submitting to verify stamps, signatures, and roll numbers remain legible.",
    ],
    faqs: [
      {
        question: "Can I compress a PDF under 200KB on mobile?",
        answer: "Yes, pkctechs works smoothly on iOS Safari and Android Chrome without requiring any app installations.",
      },
      {
        question: "Will compressing my PDF make signatures or barcodes unreadable?",
        answer: "Our compression engine specifically balances image dpi so official signatures, seals, and barcodes retain readable clarity.",
      },
    ],
  },

  "how-to-remove-background-from-image-free": {
    slug: "how-to-remove-background-from-image-free",
    title: "How to Remove Background from Images Online for Free",
    metaTitle: "How to Remove Background from Image Online Free | Transparent PNG",
    description: "Step-by-step guide to removing photo backgrounds and creating clean transparent PNGs for e-commerce products, profile avatars, and graphic design.",
    publishDate: "2026-03-02",
    readingTime: "5 min read",
    toolSlug: "background-remover",
    toolName: "Background Remover",
    category: "Image",
    sections: [
      {
        heading: "Why Transparent Backgrounds Are Essential",
        content: [
          "Whether you are selling products on Amazon, Shopify, or eBay, or creating standout thumbnails and marketing graphics, clean transparent backgrounds are essential. A transparent PNG lets you place your product or subject over any colored banner, card, or modern webpage effortlessly.",
          "In the past, removing backgrounds required complex manual pen-tool clipping in Photoshop. Today, smart browser algorithms can isolate subjects in a few seconds.",
        ],
      },
      {
        heading: "Step-by-Step Guide to Removing Image Backgrounds",
        content: [
          "1. Prepare Your Photo: Choose a photo with good lighting and clear contrast between the subject and background.",
          "2. Upload to pkctechs Background Remover: Simply drop the image file into the workspace.",
          "3. Automatic Foreground Isolation: The algorithm outlines the subject, cleanly removing the background.",
          "4. Download Transparent PNG: Preview against dark and light backdrops to check edge smoothness, then click download.",
        ],
      },
      {
        heading: "Best Practices for E-Commerce Product Photography",
        content: [
          "For the highest quality results, photograph products on a plain, neutral background (such as white poster board). Good lighting eliminates heavy shadows and yields crisp edges that look professional on any online store.",
        ],
      },
    ],
    tips: [
      "Avoid shooting dark items against pitch-black backgrounds to ensure optimal boundary detection.",
      "Export directly to PNG to maintain the alpha channel transparency layer.",
      "Use our Image Resizer and Compressor afterwards to optimize your product photos for rapid web page load times.",
    ],
    faqs: [
      {
        question: "Is there any watermark on the output PNG?",
        answer: "None! pkctechs outputs 100% clean, unwatermarked PNG files ready for professional use.",
      },
      {
        question: "Can I replace the background with a solid color?",
        answer: "Yes, once you download the transparent PNG, you can place it over any color background in Canva, Figma, or any photo editor.",
      },
    ],
  },

  "how-to-convert-pdf-to-word-without-losing-formatting": {
    slug: "how-to-convert-pdf-to-word-without-losing-formatting",
    title: "How to Convert PDF to Editable Word (.docx) Without Losing Formatting",
    metaTitle: "Convert PDF to Word DOCX Free Online | Keep Layout & Formatting",
    description: "Learn how to turn static PDF documents into fully editable Microsoft Word and Google Docs files with fonts, tables, and paragraphs intact.",
    publishDate: "2026-03-03",
    readingTime: "4 min read",
    toolSlug: "pdf-to-docx",
    toolName: "PDF to DOCX Converter",
    category: "PDF",
    sections: [
      {
        heading: "The Challenge of PDF to Word Conversion",
        content: [
          "PDFs are designed as a digital print format—meaning they lock typography, margins, and layout in fixed 2D coordinates. When converting back into a fluid document processor like Microsoft Word, many free tools scramble column alignments, tables, and paragraph breaks.",
          "With pkctechs PDF to DOCX converter, document structures are parsed intelligently so tables, text blocks, and heading hierarchies remain fully editable.",
        ],
      },
      {
        heading: "How to Convert Your PDF to Word for Free",
        content: [
          "1. Upload Document: Select your contract, resume, or report PDF.",
          "2. Automated Text & Structure Reconstruction: Our engine parses text and font styles into standard OpenXML (.docx) definitions.",
          "3. Save & Edit: Download the .docx file and edit directly in Microsoft Word, Google Docs, or LibreOffice.",
        ],
      },
    ],
    tips: [
      "If converting a scanned physical paper, ensure text is legible and well-lit.",
      "Open the converted .docx in Google Docs by simply uploading it to Google Drive and selecting 'Open with Google Docs'.",
    ],
    faqs: [
      {
        question: "Do I need to sign up or provide an email?",
        answer: "No. You never have to wait for an email link or provide personal information. Download is instant.",
      },
      {
        question: "Can I convert the edited document back to PDF?",
        answer: "Yes! Use our DOCX to PDF tool to convert your revised Word document back into a locked, professional PDF.",
      },
    ],
  },

  "how-to-resize-images-online-without-losing-quality": {
    slug: "how-to-resize-images-online-without-losing-quality",
    title: "How to Resize Images Online Without Losing Quality",
    metaTitle: "How to Resize Images Without Losing Quality | Free Online Guide",
    description: "Complete guide on changing image pixel dimensions, maintaining aspect ratios, and avoiding blurry or pixelated photos when resizing.",
    publishDate: "2026-03-04",
    readingTime: "3 min read",
    toolSlug: "image-resizer",
    toolName: "Image Resizer",
    category: "Image",
    sections: [
      {
        heading: "Understanding Pixel Dimensions vs. File Size",
        content: [
          "Resizing an image refers to changing its pixel dimensions (e.g. from 4000x3000px down to 1200x900px), whereas compressing adjusts how data is encoded. Proper resizing prevents images from slowing down your website without causing visual blur.",
          "Using our bicubic interpolation canvas algorithms, pixels are blended smoothly so edges stay sharp.",
        ],
      },
      {
        heading: "Quick Steps to Resize Photos",
        content: [
          "1. Drag your photo into the pkctechs Image Resizer.",
          "2. Enter target width or height (keep the Aspect Ratio lock checked to prevent distortion).",
          "3. Click Download to save your sharp, perfectly dimensioned image.",
        ],
      },
    ],
    tips: [
      "Always downscale from high-resolution originals rather than upscaling low-resolution thumbnails.",
      "Check common social media dimensions: 1080x1080px for Instagram squares, 1200x630px for Facebook/Twitter share previews.",
    ],
    faqs: [
      {
        question: "Why do images look stretched when resized?",
        answer: "Images look stretched when width and height are changed unevenly without locking the aspect ratio. Always lock proportions.",
      },
      {
        question: "What is the best dimension for website hero banners?",
        answer: "1920x1080px or 1600x900px are ideal for desktop displays, keeping file sizes manageable.",
      },
    ],
  },

  "how-to-merge-multiple-pdf-files-online": {
    slug: "how-to-merge-multiple-pdf-files-online",
    title: "How to Combine Multiple PDF Files Into One Document Online",
    metaTitle: "How to Merge PDF Files Free Online | Step-by-Step Guide",
    description: "Easily merge multiple PDF reports, chapters, contracts, and attachments into a single, beautifully organized PDF document for free.",
    publishDate: "2026-03-04",
    readingTime: "3 min read",
    toolSlug: "merge-pdf",
    toolName: "Merge PDF",
    category: "PDF",
    sections: [
      {
        heading: "Why Combining PDFs Makes Sharing Easier",
        content: [
          "Sending clients, professors, or colleagues five separate PDF attachments causes clutter and confusion. Merging them into a single, sequenced document provides a polished, professional presentation.",
          "With pkctechs Merge PDF, you can visually organize and combine documents in seconds without purchasing Adobe Acrobat Pro.",
        ],
      },
      {
        heading: "How to Merge Your PDFs in Seconds",
        content: [
          "1. Select All Your PDF Files: Upload the documents you wish to combine.",
          "2. Drag to Reorder: Arrange the order of pages and files so they appear in sequence.",
          "3. Merge & Save: Click merge to instantly bundle everything into one clean document.",
        ],
      },
    ],
    tips: [
      "Number your PDF filenames before uploading (e.g. 01_Resume, 02_CoverLetter, 03_Certificates) for effortless sorting.",
      "Use our PDF Compressor afterwards if the combined document exceeds email file attachment limits.",
    ],
    faqs: [
      {
        question: "Is there a limit to how many PDFs I can combine?",
        answer: "No, you can combine as many PDF documents as you need completely free.",
      },
      {
        question: "Are my merged documents private?",
        answer: "Yes, files are processed client-side in your browser and are never uploaded to any server.",
      },
    ],
  },
};
