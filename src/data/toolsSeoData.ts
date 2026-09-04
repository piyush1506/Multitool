export interface ToolStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolFeature {
  title: string;
  description: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolSeoData {
  slug: string;
  name: string;
  shortName: string;
  category: "Image" | "PDF" | "Developer" | "Utility";
  badge: string;
  intro: string;
  steps: ToolStep[];
  features: ToolFeature[];
  faqs: ToolFaq[];
  relatedSlugs: string[];
}

export const toolsSeoData: Record<string, ToolSeoData> = {
  "image-resizer": {
    slug: "image-resizer",
    name: "Free Online Image Resizer",
    shortName: "Image Resizer",
    category: "Image",
    badge: "Fast & Quality Preserved",
    intro: "Resize image dimensions in pixels or percentages online for free. Adjust widths and heights with locked aspect ratios and zero quality loss.",
    steps: [
      {
        step: 1,
        title: "Upload Your Image",
        description: "Click to upload or drag and drop your JPG, PNG, or WEBP photo into the resizer box.",
      },
      {
        step: 2,
        title: "Choose Dimensions",
        description: "Specify your desired pixel width and height, or scale by percentage. Toggle aspect ratio lock as needed.",
      },
      {
        step: 3,
        title: "Download Resized Image",
        description: "Hit download to instantly save your resized, high-quality image directly to your device.",
      },
    ],
    features: [
      {
        title: "100% Private & Browser-Based",
        description: "All resizing calculations happen locally in your browser. Your images are never uploaded to any remote server.",
      },
      {
        title: "Maintain Aspect Ratio",
        description: "Keep original proportions automatically locked so your photos never look stretched or distorted.",
      },
      {
        title: "Multiple Format Support",
        description: "Easily resize JPG, PNG, WEBP, and GIF images with instant preview capabilities.",
      },
      {
        title: "Zero Watermarks & Free Forever",
        description: "No hidden fees, no subscriptions, no account registration, and zero watermarks on your files.",
      },
    ],
    faqs: [
      {
        question: "Does resizing reduce image quality?",
        answer: "Our tool utilizes modern browser canvas bicubic smoothing algorithms to preserve maximum sharpness and minimize pixelation when resizing.",
      },
      {
        question: "Are my uploaded photos safe and confidential?",
        answer: "Yes, 100%. Processing is executed client-side via JavaScript. Your photos never leave your device or get saved on any server.",
      },
      {
        question: "Can I resize by percentage instead of pixels?",
        answer: "Yes, you can switch between exact pixel dimensions (px) and percentage scaling (e.g. 50%, 75%, 150%) with a single click.",
      },
      {
        question: "Is there a limit on how many images I can resize?",
        answer: "There are no limits! You can resize as many photos as you want completely free.",
      },
    ],
    relatedSlugs: ["image-compressor", "image-cropper", "image-converter", "background-remover"],
  },

  "image-compressor": {
    slug: "image-compressor",
    name: "Free Online Image Compressor",
    shortName: "Image Compressor",
    category: "Image",
    badge: "Up to 90% Size Reduction",
    intro: "Compress JPEG, PNG, and WEBP images online without noticeable quality loss. Drastically reduce photo file sizes for faster websites and email attachments.",
    steps: [
      {
        step: 1,
        title: "Select or Drop Photos",
        description: "Select one or multiple images from your computer or phone to start compression.",
      },
      {
        step: 2,
        title: "Adjust Quality Level",
        description: "Use the quality slider to find your perfect balance between file size reduction and image clarity.",
      },
      {
        step: 3,
        title: "Download Compressed File",
        description: "Compare before and after sizes, then download your lightweight image in one click.",
      },
    ],
    features: [
      {
        title: "Smart Lossy & Lossless Compression",
        description: "Reduces file size by eliminating redundant metadata and optimizing color palettes while preserving crisp details.",
      },
      {
        title: "Real-Time File Size Preview",
        description: "Instantly see the original file size, compressed size, and total percentage saved before downloading.",
      },
      {
        title: "Completely Private",
        description: "All compression happens strictly inside your browser memory. No data is sent over the internet.",
      },
      {
        title: "Optimized for Web & SEO",
        description: "Perfect for webmasters, bloggers, and developers seeking to improve Google Core Web Vitals and PageSpeed scores.",
      },
    ],
    faqs: [
      {
        question: "How much file size can I save?",
        answer: "Depending on the original format and resolution, our compressor typically reduces file size between 60% to 90% without visible degradation.",
      },
      {
        question: "Which formats are supported?",
        answer: "You can compress JPG, JPEG, PNG, and modern WEBP image formats.",
      },
      {
        question: "Will image compression remove metadata (EXIF data)?",
        answer: "Yes, non-essential EXIF metadata (camera info, GPS location) is stripped during compression, protecting your privacy and saving storage.",
      },
    ],
    relatedSlugs: ["image-resizer", "image-converter", "image-to-pdf", "image-cropper"],
  },

  "image-converter": {
    slug: "image-converter",
    name: "Free Online Image Converter",
    shortName: "Image Converter",
    category: "Image",
    badge: "PNG, JPG, WEBP & More",
    intro: "Convert photos between PNG, JPG, and WEBP formats seamlessly in seconds. Enjoy batch conversion with pristine quality retention.",
    steps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Drop your image file into the converter or browse files from your local storage.",
      },
      {
        step: 2,
        title: "Choose Target Format",
        description: "Select whether you want to convert to PNG, JPG/JPEG, or WEBP.",
      },
      {
        step: 3,
        title: "Convert & Save",
        description: "Click convert to process the format transformation and download your new file immediately.",
      },
    ],
    features: [
      {
        title: "Lightning-Fast Conversion",
        description: "Instantaneous format conversion powered by high-speed client-side canvas rendering.",
      },
      {
        title: "Preserves Transparency",
        description: "Converting to PNG or WEBP maintains alpha transparency channels flawlessly.",
      },
      {
        title: "No Server Uploads",
        description: "Your files never leave your computer, guaranteeing maximum confidentiality.",
      },
      {
        title: "Universal Device Compatibility",
        description: "Works seamlessly across Windows, Mac, Linux, iPhone, iPad, and Android browsers.",
      },
    ],
    faqs: [
      {
        question: "What is the best format for website images?",
        answer: "WEBP offers significantly smaller file sizes with comparable quality to PNG and JPG, making it the industry standard for fast-loading websites.",
      },
      {
        question: "Does converting PNG to JPG remove transparency?",
        answer: "Yes, because JPG does not support transparent layers, transparent areas will default to a solid white or black background.",
      },
      {
        question: "Is there any software installation required?",
        answer: "No installation or plugin is required. Everything runs 100% online directly in your browser.",
      },
    ],
    relatedSlugs: ["svg-to-png", "image-compressor", "image-resizer", "image-to-pdf"],
  },

  "background-remover": {
    slug: "background-remover",
    name: "AI Background Remover Online",
    shortName: "Background Remover",
    category: "Image",
    badge: "100% Free & Transparent PNG",
    intro: "Remove backgrounds from portraits, product photos, graphics, and logos automatically. Generate clean transparent PNG cutouts in one click.",
    steps: [
      {
        step: 1,
        title: "Upload Photo",
        description: "Choose a photo with a person, product, animal, or object that you want to isolate.",
      },
      {
        step: 2,
        title: "Automated Background Eraser",
        description: "Our smart algorithm detects foreground boundaries and isolates the subject seamlessly.",
      },
      {
        step: 3,
        title: "Download Transparent PNG",
        description: "Preview your cutout against light and dark backdrops, then save the transparent PNG.",
      },
    ],
    features: [
      {
        title: "Pixel-Perfect Edge Detection",
        description: "Smooth handling around hair, contours, and complex edges for professional-grade cutouts.",
      },
      {
        title: "E-Commerce Ready",
        description: "Ideal for Amazon, eBay, Shopify product listings, profile avatars, and graphic design.",
      },
      {
        title: "High-Resolution Output",
        description: "Download full-resolution cutouts without downscaling or blurriness.",
      },
      {
        title: "Total Privacy Protection",
        description: "All photo analysis happens directly on your device with zero cloud storage.",
      },
    ],
    faqs: [
      {
        question: "Is this background remover completely free?",
        answer: "Yes, unlike other services that charge credits or add watermarks, pkctechs Background Remover is completely free with no limits.",
      },
      {
        question: "What kind of images work best?",
        answer: "Images with clear contrast between the foreground subject and background produce the sharpest, cleanest cutout results.",
      },
      {
        question: "What file format will I get?",
        answer: "You will download a transparent PNG file that can be placed over any background color or design.",
      },
    ],
    relatedSlugs: ["image-cropper", "image-converter", "image-resizer", "image-compressor"],
  },

  "image-cropper": {
    slug: "image-cropper",
    name: "Free Online Image Cropper",
    shortName: "Image Cropper",
    category: "Image",
    badge: "Preset Social Ratios",
    intro: "Crop, trim, and adjust photos easily. Use standard aspect ratios for Instagram, YouTube, Facebook, Twitter, and custom square crops.",
    steps: [
      {
        step: 1,
        title: "Import Your Image",
        description: "Select the photo you want to crop from your device.",
      },
      {
        step: 2,
        title: "Adjust Crop Box",
        description: "Drag the crop handles or choose presets (1:1, 16:9, 4:3) to frame the focal point.",
      },
      {
        step: 3,
        title: "Save Cropped Photo",
        description: "Export the trimmed photo instantly in high definition.",
      },
    ],
    features: [
      {
        title: "Social Media Presets",
        description: "Pre-configured ratios for profile pictures, stories, thumbnails, and banners.",
      },
      {
        title: "Freeform & Locked Ratios",
        description: "Switch freely between flexible custom crops or strictly locked proportions.",
      },
      {
        title: "Instant Live Preview",
        description: "See exact pixel dimensions update live as you drag the cropping boundary.",
      },
      {
        title: "Preserves Original Resolution",
        description: "Exports cropped areas at native pixel density without unnecessary compression.",
      },
    ],
    faqs: [
      {
        question: "Can I crop circular profile pictures?",
        answer: "Yes, you can crop to a 1:1 square ratio which fits perfectly into round social media avatar frames.",
      },
      {
        question: "Does cropping reduce photo clarity?",
        answer: "No, cropping merely trims away outer pixels while leaving the selected region at 100% native quality.",
      },
    ],
    relatedSlugs: ["image-resizer", "background-remover", "image-compressor", "image-converter"],
  },

  "image-to-pdf": {
    slug: "image-to-pdf",
    name: "Convert Images to PDF Online",
    shortName: "Image to PDF",
    category: "PDF",
    badge: "Combine Multiple Photos",
    intro: "Convert JPG, PNG, and WEBP pictures into a professional, multi-page PDF file in seconds. Reorder pages and customize orientation for free.",
    steps: [
      {
        step: 1,
        title: "Add Images",
        description: "Upload one or dozens of photos from your gallery or desktop folder.",
      },
      {
        step: 2,
        title: "Arrange & Reorder",
        description: "Drag and drop thumbnails to order your pages exactly the way you want.",
      },
      {
        step: 3,
        title: "Generate PDF",
        description: "Click generate to merge all images into a unified, cleanly formatted PDF document.",
      },
    ],
    features: [
      {
        title: "Batch Image Merging",
        description: "Combine unlimited images into a single compact PDF document effortlessly.",
      },
      {
        title: "Page Order Flexibility",
        description: "Easily reorder, remove, or rotate individual images before compiling.",
      },
      {
        title: "High Definition Preservation",
        description: "Documents, certificates, and invoices are rendered crisp and ready for printing.",
      },
      {
        title: "Encrypted & Secure",
        description: "All processing occurs within your browser environment for confidential documents.",
      },
    ],
    faqs: [
      {
        question: "Can I combine both JPG and PNG into one PDF?",
        answer: "Yes, you can mix different image formats (JPG, PNG, WEBP) in the same batch and they will be compiled into one PDF.",
      },
      {
        question: "Is there a limit on how many images I can convert?",
        answer: "No, you can add as many photos as your browser memory permits.",
      },
    ],
    relatedSlugs: ["pdf-to-image", "merge-pdf", "pdf-compressor", "docx-to-pdf"],
  },

  "pdf-to-image": {
    slug: "pdf-to-image",
    name: "Convert PDF to JPG / PNG Online",
    shortName: "PDF to Image",
    category: "PDF",
    badge: "High Resolution Extraction",
    intro: "Convert PDF document pages into high-resolution JPG or PNG images. Extract individual slides, receipts, and pages with crisp fidelity.",
    steps: [
      {
        step: 1,
        title: "Select PDF Document",
        description: "Upload the PDF document you want to convert into images.",
      },
      {
        step: 2,
        title: "Select Page or Range",
        description: "Choose whether to extract all pages or select specific pages.",
      },
      {
        step: 3,
        title: "Download Images",
        description: "Save individual image files or all pages at full resolution.",
      },
    ],
    features: [
      {
        title: "Crisp Typography & Graphics",
        description: "Vector elements and text in your PDF are rendered into high-DPI raster images.",
      },
      {
        title: "PNG or JPG Export",
        description: "Choose PNG for maximum sharpness and lossless detail, or JPG for smaller sizes.",
      },
      {
        title: "Zero Data Logging",
        description: "Sensitive bank statements, contracts, and IDs remain strictly on your machine.",
      },
      {
        title: "Works on All Browsers",
        description: "No Adobe Acrobat or external desktop software required.",
      },
    ],
    faqs: [
      {
        question: "What resolution are the extracted images?",
        answer: "Pages are converted at high DPI (standard print/screen resolution) to ensure text and charts remain completely readable.",
      },
      {
        question: "Can I convert password-protected PDFs?",
        answer: "You will need to unlock the PDF file before converting it into images.",
      },
    ],
    relatedSlugs: ["image-to-pdf", "pdf-compressor", "merge-pdf", "split-pdf"],
  },

  "pdf-compressor": {
    slug: "pdf-compressor",
    name: "Compress PDF Online For Free",
    shortName: "PDF Compressor",
    category: "PDF",
    badge: "Reduce PDF Size",
    intro: "Shrink large PDF file sizes online for free. Optimize documents for email attachments, job applications, and government portals.",
    steps: [
      {
        step: 1,
        title: "Upload PDF",
        description: "Drop your PDF file into the upload zone.",
      },
      {
        step: 2,
        title: "Select Compression Level",
        description: "Choose your preferred balance between size reduction and visual sharpness.",
      },
      {
        step: 3,
        title: "Save Smaller PDF",
        description: "Download the compressed PDF file ready for sending.",
      },
    ],
    features: [
      {
        title: "Ideal for Email & Portal Limits",
        description: "Quickly reduce PDFs under 2MB, 500KB, or 200KB limits required by portal uploads.",
      },
      {
        title: "Legible Text Retention",
        description: "Text remains fully searchable, selectable, and sharp while embedded images are optimized.",
      },
      {
        title: "100% Client-Side Privacy",
        description: "No government IDs or confidential contracts ever touch a cloud server.",
      },
      {
        title: "Unlimited Free Use",
        description: "Compress as many PDF files as you need without paid upgrades.",
      },
    ],
    faqs: [
      {
        question: "How can I reduce my PDF under 200KB?",
        answer: "Select high compression mode. This compresses embedded pictures and strips unused font data, significantly reducing size.",
      },
      {
        question: "Does PDF compression make text blurry?",
        answer: "No, PDF text is stored as vector glyphs and retains crisp readability at any zoom level.",
      },
    ],
    relatedSlugs: ["merge-pdf", "split-pdf", "pdf-to-docx", "image-to-pdf"],
  },

  "merge-pdf": {
    slug: "merge-pdf",
    name: "Merge PDF Files Online",
    shortName: "Merge PDF",
    category: "PDF",
    badge: "Combine Multiple PDFs",
    intro: "Combine multiple PDF documents into a single organized file in seconds. Rearrange pages easily with visual drag-and-drop.",
    steps: [
      {
        step: 1,
        title: "Upload PDF Files",
        description: "Select two or more PDF files you want to combine.",
      },
      {
        step: 2,
        title: "Order Documents",
        description: "Reorder the document cards to match your desired final sequence.",
      },
      {
        step: 3,
        title: "Merge & Download",
        description: "Click merge to assemble the unified PDF and download it immediately.",
      },
    ],
    features: [
      {
        title: "Drag & Drop Organization",
        description: "Intuitive reordering interface makes arranging multi-document packets effortless.",
      },
      {
        title: "Preserve Bookmarks & Quality",
        description: "Original page formatting, links, and content quality are maintained.",
      },
      {
        title: "Fast Local Merging",
        description: "Zero network upload latency—files are assembled directly in your browser memory.",
      },
      {
        title: "No Account Required",
        description: "Use immediately without signup, credit card, or recurring fees.",
      },
    ],
    faqs: [
      {
        question: "Can I merge more than 2 PDFs at once?",
        answer: "Yes, you can merge dozens of PDF documents together into a single file in one session.",
      },
      {
        question: "Are my merged documents secure?",
        answer: "Yes, because processing happens entirely client-side, your files never leave your computer.",
      },
    ],
    relatedSlugs: ["split-pdf", "pdf-compressor", "pdf-to-docx", "image-to-pdf"],
  },

  "split-pdf": {
    slug: "split-pdf",
    name: "Split PDF Pages Online",
    shortName: "Split PDF",
    category: "PDF",
    badge: "Extract Specific Pages",
    intro: "Separate specific pages or page ranges from any PDF document. Extract chapters, invoices, or individual pages with precision.",
    steps: [
      {
        step: 1,
        title: "Choose PDF",
        description: "Upload the PDF document you need to split.",
      },
      {
        step: 2,
        title: "Select Page Numbers",
        description: "Specify individual page numbers or ranges (e.g. 1-3, 5, 8-10).",
      },
      {
        step: 3,
        title: "Extract & Save",
        description: "Download your newly created PDF containing only the selected pages.",
      },
    ],
    features: [
      {
        title: "Custom Page Range Selection",
        description: "Enter any combination of individual pages and contiguous ranges.",
      },
      {
        title: "Retain Original Quality",
        description: "Extracted pages preserve vector text, graphics, and original formatting.",
      },
      {
        title: "Instant Execution",
        description: "Splits large files in milliseconds directly within your browser.",
      },
      {
        title: "Completely Private",
        description: "No file copies are retained on third-party servers.",
      },
    ],
    faqs: [
      {
        question: "How do I specify page ranges?",
        answer: "Use commas and hyphens, such as '1-5, 8, 11-14', to specify which pages to include in the output PDF.",
      },
      {
        question: "Will the original PDF be modified?",
        answer: "No, your original file remains unchanged on your computer; a new PDF with the split pages is created.",
      },
    ],
    relatedSlugs: ["merge-pdf", "pdf-compressor", "pdf-to-image", "pdf-to-docx"],
  },

  "pdf-to-docx": {
    slug: "pdf-to-docx",
    name: "Convert PDF to Word DOCX Online",
    shortName: "PDF to DOCX",
    category: "PDF",
    badge: "Editable Word Document",
    intro: "Convert PDF documents into editable Microsoft Word (.docx) files online for free. Keep text, paragraphs, and tables intact.",
    steps: [
      {
        step: 1,
        title: "Upload PDF",
        description: "Select the PDF file you need to turn into an editable Word document.",
      },
      {
        step: 2,
        title: "Convert to DOCX",
        description: "Our converter parses document layouts and converts text into editable formats.",
      },
      {
        step: 3,
        title: "Download Word File",
        description: "Open the downloaded .docx file in Microsoft Word, Google Docs, or LibreOffice.",
      },
    ],
    features: [
      {
        title: "Editable Text & Tables",
        description: "Transform static PDFs into fully editable Word documents ready for revision.",
      },
      {
        title: "Google Docs & MS Word Compatible",
        description: "Exports standard .docx files fully supported by all modern word processors.",
      },
      {
        title: "No Email or Registration Needed",
        description: "Get your converted file right away without waiting for an email link.",
      },
      {
        title: "100% Free & Unlimited",
        description: "Convert resumes, contracts, and reports without paywalls.",
      },
    ],
    faqs: [
      {
        question: "Can I edit the converted Word document in Google Docs?",
        answer: "Yes, the exported .docx file can be uploaded and edited directly inside Google Docs, Office 365, or desktop Microsoft Word.",
      },
      {
        question: "Does it preserve formatting and tables?",
        answer: "Yes, our converter structures paragraphs, bullet points, and tables to closely match your original PDF.",
      },
    ],
    relatedSlugs: ["docx-to-pdf", "pdf-compressor", "merge-pdf", "format-converter"],
  },

  "docx-to-pdf": {
    slug: "docx-to-pdf",
    name: "Convert Word DOCX to PDF Online",
    shortName: "DOCX to PDF",
    category: "PDF",
    badge: "Universal Print Layout",
    intro: "Convert Microsoft Word (.docx) files into clean, universally readable PDF documents. Preserve fonts, margins, and layout across all devices.",
    steps: [
      {
        step: 1,
        title: "Select Word File",
        description: "Upload your .docx file from your local storage.",
      },
      {
        step: 2,
        title: "Generate PDF",
        description: "The engine formats your document pages into fixed PDF layouts.",
      },
      {
        step: 3,
        title: "Download PDF",
        description: "Save your locked, professional PDF ready for sending or printing.",
      },
    ],
    features: [
      {
        title: "Locked Formatting",
        description: "Prevents font substitution or formatting shifts when viewing across different devices.",
      },
      {
        title: "High-Quality Vector Text",
        description: "Typography remains razor-sharp when printed or viewed on high-DPI screens.",
      },
      {
        title: "Instant In-Browser Conversion",
        description: "Converts without needing Microsoft Word installed on your computer.",
      },
      {
        title: "Safe & Confidential",
        description: "Client-side execution keeps your sensitive letters and resumes private.",
      },
    ],
    faqs: [
      {
        question: "Will the PDF look identical to my Word document?",
        answer: "Yes, margins, headings, paragraph spacing, and images are accurately preserved in the PDF output.",
      },
      {
        question: "Do I need Microsoft Office installed?",
        answer: "No, our online tool runs completely within your web browser without requiring Office or plugins.",
      },
    ],
    relatedSlugs: ["pdf-to-docx", "pdf-compressor", "image-to-pdf", "merge-pdf"],
  },

  "format-converter": {
    slug: "format-converter",
    name: "Data & Code Format Converter",
    shortName: "Format Converter",
    category: "Developer",
    badge: "JSON, CSV, XML & YAML",
    intro: "Convert structured data formats between JSON, CSV, XML, and YAML effortlessly. Clean, validate, and transform data payloads instantly.",
    steps: [
      {
        step: 1,
        title: "Paste or Upload Data",
        description: "Paste your raw JSON, CSV, or XML data into the input box.",
      },
      {
        step: 2,
        title: "Select Target Syntax",
        description: "Choose your target format (e.g. JSON to CSV or CSV to JSON).",
      },
      {
        step: 3,
        title: "Copy or Download",
        description: "Copy formatted results to your clipboard or download as a file.",
      },
    ],
    features: [
      {
        title: "Multi-Format Flexibility",
        description: "Convert seamlessly between JSON arrays, spreadsheet CSVs, XML trees, and YAML schemas.",
      },
      {
        title: "Syntax Validation",
        description: "Highlights syntax errors and malformed lines with helpful debugging hints.",
      },
      {
        title: "Client-Side Privacy",
        description: "Private database dumps, API credentials, and client lists never touch external servers.",
      },
      {
        title: "One-Click Clipboard Copy",
        description: "Easily copy transformed payloads into your code editor or spreadsheet application.",
      },
    ],
    faqs: [
      {
        question: "Can I convert JSON with nested objects to CSV?",
        answer: "Yes, nested object keys can be flattened into dot-notated column headers suitable for Excel and Google Sheets.",
      },
      {
        question: "Is there a limit on input data size?",
        answer: "Since conversion runs in-browser, it can comfortably handle large datasets up to dozens of megabytes.",
      },
    ],
    relatedSlugs: ["json-formatter", "base64-tool", "password-generator", "color-picker"],
  },

  "qr-generator": {
    slug: "qr-generator",
    name: "Free Custom QR Code Generator",
    shortName: "QR Code Generator",
    category: "Utility",
    badge: "Custom Colors & High Res",
    intro: "Generate custom QR codes for websites, Wi-Fi networks, contact vCards, phone numbers, and plain text. Download high-resolution PNG or SVG codes.",
    steps: [
      {
        step: 1,
        title: "Enter URL or Text",
        description: "Type in your destination link, Wi-Fi details, or text message.",
      },
      {
        step: 2,
        title: "Customize Appearance",
        description: "Choose foreground and background colors to match your brand identity.",
      },
      {
        step: 3,
        title: "Export QR Code",
        description: "Download crisp QR codes in PNG or vector formats ready for print and marketing.",
      },
    ],
    features: [
      {
        title: "Never Expires",
        description: "Generates permanent, static QR codes that never expire and don't redirect through third-party ad links.",
      },
      {
        title: "High Error Correction",
        description: "Ensures scannability even when printed on textured paper or slightly damaged.",
      },
      {
        title: "Custom Brand Colors",
        description: "Personalize your QR code colors to match your website or company branding.",
      },
      {
        title: "Print Ready Resolution",
        description: "Crisp vector and high-DPI output perfect for posters, packaging, and menus.",
      },
    ],
    faqs: [
      {
        question: "Do these QR codes have an expiration date?",
        answer: "No! Static QR codes contain your data directly encoded into the matrix and will function indefinitely.",
      },
      {
        question: "Can smartphones scan these QR codes without an app?",
        answer: "Yes, all modern iOS and Android camera apps scan these QR codes natively without third-party apps.",
      },
    ],
    relatedSlugs: ["color-picker", "base64-tool", "password-generator", "svg-to-png"],
  },

  "svg-to-png": {
    slug: "svg-to-png",
    name: "Convert SVG to PNG Online",
    shortName: "SVG to PNG",
    category: "Image",
    badge: "Vector to High-DPI Raster",
    intro: "Convert scalable vector graphics (SVG) into transparent PNG images with customizable resolution and sharpness.",
    steps: [
      {
        step: 1,
        title: "Upload SVG",
        description: "Drop your .svg file or paste raw vector XML markup.",
      },
      {
        step: 2,
        title: "Select Output Scale",
        description: "Choose your target pixel width or scale multiplier (1x, 2x, 4x, 8x).",
      },
      {
        step: 3,
        title: "Download PNG",
        description: "Save your crisp, transparent PNG raster file.",
      },
    ],
    features: [
      {
        title: "Custom Resolution Scaling",
        description: "Scale your vectors up to 4K or 8K without any blurriness or pixelation.",
      },
      {
        title: "Alpha Transparency Intact",
        description: "Transparent backgrounds and gradients are perfectly preserved.",
      },
      {
        title: "Fast Canvas Rendering",
        description: "Renders complex shapes, paths, and inline fonts accurately.",
      },
      {
        title: "Secure & Client-Side",
        description: "Your proprietary SVG logos and iconography remain secure on your device.",
      },
    ],
    faqs: [
      {
        question: "Can I scale up the PNG to 4K or higher?",
        answer: "Yes, because SVGs are vector-based, you can export at any pixel dimension without losing sharpness.",
      },
      {
        question: "Does the output PNG support transparency?",
        answer: "Yes, transparent SVG canvases export with a 32-bit transparent PNG alpha channel.",
      },
    ],
    relatedSlugs: ["image-converter", "image-resizer", "image-compressor", "image-cropper"],
  },

  "color-picker": {
    slug: "color-picker",
    name: "HEX, RGB & HSL Color Picker",
    shortName: "Color Picker",
    category: "Developer",
    badge: "Palette & Contrast Checker",
    intro: "Inspect, convert, and harmonize colors across HEX, RGB, HSL, and CMYK. Generate complementary palettes and check WCAG contrast accessibility.",
    steps: [
      {
        step: 1,
        title: "Select or Input Color",
        description: "Pick a shade with the interactive visual wheel or paste any color code.",
      },
      {
        step: 2,
        title: "View Format Values",
        description: "Instantly view equivalent HEX, RGB, HSL, and HSV numerical values.",
      },
      {
        step: 3,
        title: "Copy CSS Code",
        description: "Click any value to copy ready-to-use CSS syntax directly to your clipboard.",
      },
    ],
    features: [
      {
        title: "Multi-Format Synchronization",
        description: "Converts seamlessly between HEX, RGBA, HSLA, and CSS color declarations.",
      },
      {
        title: "Harmonious Palettes",
        description: "Generate complementary, monochromatic, and analogous color harmonies automatically.",
      },
      {
        title: "WCAG Contrast Verification",
        description: "Check text vs. background contrast ratios to meet accessibility standards.",
      },
      {
        title: "Instant One-Click Copy",
        description: "Fast clipboard access for web developers, UI designers, and digital artists.",
      },
    ],
    faqs: [
      {
        question: "What color formats are supported?",
        answer: "The picker supports HEX, RGB, RGBA, HSL, HSLA, HSV, and standard CSS named color keywords.",
      },
      {
        question: "Can I inspect contrast accessibility?",
        answer: "Yes, the tool calculates contrast ratios and highlights compliance with WCAG AA and AAA standards.",
      },
    ],
    relatedSlugs: ["format-converter", "base64-tool", "json-formatter", "qr-generator"],
  },

  "password-generator": {
    slug: "password-generator",
    name: "Secure Random Password Generator",
    shortName: "Password Generator",
    category: "Utility",
    badge: "Cryptographically Secure",
    intro: "Generate unbreakable, cryptographically secure random passwords and passphrases. Protect your online accounts with custom character rules.",
    steps: [
      {
        step: 1,
        title: "Set Password Length",
        description: "Choose length between 8 to 64 characters (16+ recommended for high security).",
      },
      {
        step: 2,
        title: "Select Character Rules",
        description: "Toggle uppercase, lowercase, numbers, and special symbols.",
      },
      {
        step: 3,
        title: "Copy Secure Token",
        description: "Copy your new password safely to your password manager.",
      },
    ],
    features: [
      {
        title: "CSPRNG Randomness",
        description: "Uses Web Cryptography API (window.crypto) for true entropy that cannot be predicted.",
      },
      {
        title: "Zero Logging & Zero Transmission",
        description: "Passwords are generated purely in your browser memory and never saved anywhere.",
      },
      {
        title: "Strength Meter & Entropy Rating",
        description: "Real-time evaluation of password complexity, crack time, and bits of entropy.",
      },
      {
        title: "Avoid Ambiguous Characters",
        description: "Option to exclude confusing characters like 0, O, 1, l, and I for error-free typing.",
      },
    ],
    faqs: [
      {
        question: "Is this password generator safe to use?",
        answer: "Yes. It uses the browser's native window.crypto cryptographic engine. The generated passwords never travel over the internet.",
      },
      {
        question: "What is the recommended password length in 2026?",
        answer: "Security experts recommend at least 16 characters containing a mix of upper, lower, numbers, and special symbols.",
      },
    ],
    relatedSlugs: ["base64-tool", "qr-generator", "format-converter", "color-picker"],
  },

  "base64-tool": {
    slug: "base64-tool",
    name: "Base64 Encoder & Decoder Online",
    shortName: "Base64 Tool",
    category: "Developer",
    badge: "Text & File Encoding",
    intro: "Encode and decode Base64 strings and files online. Convert ASCII text, UTF-8 unicode, images, and binary payloads instantly.",
    steps: [
      {
        step: 1,
        title: "Input Text or File",
        description: "Paste text or drop a file to encode or decode.",
      },
      {
        step: 2,
        title: "Select Action",
        description: "Toggle between Encode (Plain to Base64) or Decode (Base64 to Plain).",
      },
      {
        step: 3,
        title: "Copy Result",
        description: "Copy the output string or download the decoded file.",
      },
    ],
    features: [
      {
        title: "Full UTF-8 & Emoji Support",
        description: "Properly handles international unicode characters and emojis without mangling.",
      },
      {
        title: "Data URI Scheme Generation",
        description: "Generate ready-to-embed data:image/png;base64 URLs for HTML and CSS.",
      },
      {
        title: "Local Execution",
        description: "Decode sensitive authorization headers and tokens with complete confidentiality.",
      },
      {
        title: "One-Click Quick Copy",
        description: "Instantly copy large Base64 strings with feedback notification.",
      },
    ],
    faqs: [
      {
        question: "What is Base64 encoding used for?",
        answer: "Base64 is used to encode binary data (like images or encrypted keys) into an ASCII string format suitable for HTTP transfers and JSON payloads.",
      },
      {
        question: "Is Base64 an encryption method?",
        answer: "No, Base64 is an encoding format, not encryption. Anyone can decode a Base64 string back to its original form.",
      },
    ],
    relatedSlugs: ["json-formatter", "format-converter", "password-generator", "color-picker"],
  },

  "json-formatter": {
    slug: "json-formatter",
    name: "JSON Formatter, Validator & Beautifier",
    shortName: "JSON Formatter",
    category: "Developer",
    badge: "Prettify & Minify",
    intro: "Format, beautify, validate, and minify JSON online. Clean up minified API responses and identify syntax errors with line-number precision.",
    steps: [
      {
        step: 1,
        title: "Paste Raw JSON",
        description: "Paste your raw or minified JSON payload into the code editor.",
      },
      {
        step: 2,
        title: "Beautify or Minify",
        description: "Click format to indent with 2 or 4 spaces, or minify to eliminate whitespace.",
      },
      {
        step: 3,
        title: "Copy Clean JSON",
        description: "Copy the validated, syntax-highlighted JSON or download as a .json file.",
      },
    ],
    features: [
      {
        title: "Precise Error Highlighting",
        description: "Pinpoints exact line numbers and characters where JSON syntax is broken.",
      },
      {
        title: "Beautify & Minify",
        description: "Easily switch between readable multi-line indentation and ultra-compact minified strings.",
      },
      {
        title: "Tree View & Search",
        description: "Browse complex nested JSON trees and inspect object properties effortlessly.",
      },
      {
        title: "Complete Data Privacy",
        description: "No proprietary JSON payloads or API responses are transmitted across the web.",
      },
    ],
    faqs: [
      {
        question: "Why is my JSON invalid?",
        answer: "Common issues include unquoted property keys, single quotes instead of double quotes, trailing commas after the last array/object element, or unescaped characters.",
      },
      {
        question: "Is my JSON data kept private?",
        answer: "Yes, parsing and formatting are executed purely inside your browser. No server logging takes place.",
      },
    ],
    relatedSlugs: ["format-converter", "base64-tool", "color-picker", "password-generator"],
  },
};

export function getFaqSchema(slug: string) {
  const data = toolsSeoData[slug];
  if (!data || !data.faqs || data.faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

