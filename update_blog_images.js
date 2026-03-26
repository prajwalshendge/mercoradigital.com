const fs = require('fs');
const glob = require('glob'); // Not using glob, just fs.readdirSync to avoid dependencies

const unsplashImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', // Data/Marketing
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', // Team
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', // Dashboard
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80', // Social/Phone
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', // Tech/Abstract
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80', // Web Design
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80', // Strategy/Writing
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80', // Strategy/Meeting
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80', // Corporate/Abstract
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80', // Digital workspace
    'https://images.unsplash.com/photo-1661956602868-6ae368943878?auto=format&fit=crop&w=1200&q=80', // Premium geometric
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80'  // Business hands
];

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let imgIndex = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Specifically target blog images and related post images
    const regex = /src="images\/blog\/[^"]+"/g;
    
    if (content.match(regex)) {
        content = content.replace(regex, (match) => {
            const newSrc = `src="${unsplashImages[imgIndex % unsplashImages.length]}"`;
            imgIndex++;
            return newSrc;
        });
        fs.writeFileSync(file, content);
        console.log(`Updated images in ${file}`);
    }
});

console.log('All blog images successfully pointing to premium Unsplash photography.');
