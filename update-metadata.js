const fs = require('fs');
const path = require('path');
const toolsDir = path.join(__dirname, 'src', 'app', 'tools');

if (fs.existsSync(toolsDir)) {
  const dirs = fs.readdirSync(toolsDir).filter(d => fs.statSync(path.join(toolsDir, d)).isDirectory());

  dirs.forEach(dir => {
    const file = path.join(toolsDir, dir, 'page.tsx');
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      if (titleMatch) {
        const fullTitle = titleMatch[1];
        const toolName = fullTitle.split(' | ')[0].trim();
        
        // If it already has siteName: "pkctechs"
        if (content.includes('siteName: "pkctechs"')) {
            content = content.replace(/siteName:\s*["']pkctechs["']/, `siteName: "${toolName}"`);
            fs.writeFileSync(file, content);
            console.log('Updated existing siteName in ' + dir);
        } else if (!content.includes('siteName:')) {
            // Check if openGraph already exists
            if (content.includes('openGraph: {')) {
                content = content.replace(/openGraph:\s*{/, `openGraph: {\n    siteName: "${toolName}",`);
                fs.writeFileSync(file, content);
                console.log('Added siteName to existing openGraph in ' + dir);
            } else {
                content = content.replace(/};/, `  applicationName: "${toolName}",\n  openGraph: {\n    siteName: "${toolName}",\n  }\n};`);
                fs.writeFileSync(file, content);
                console.log('Added openGraph and siteName to ' + dir);
            }
        }
      }
    }
  });
}
