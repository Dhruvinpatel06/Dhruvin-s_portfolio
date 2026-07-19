const sharp = require('sharp');

(async () => {
  // Best 6 frames from the video that tell the BrandMirror story
  const frames = [
    'D:/Hackathon/BrandMirror/frame_01.png', // Dashboard with brand grid & stats
    'D:/Hackathon/BrandMirror/frame_02.png', // Zomato Intelligence Hub - onboarding
    'D:/Hackathon/BrandMirror/frame_04.png', // Week 1 Sentiment Analysis + Memory Log 
    'D:/Hackathon/BrandMirror/frame_05.png', // Week 3 Deep Analysis - themes/severity
    'D:/Hackathon/BrandMirror/frame_06.png', // Cross-Company Strategic Audit
    'D:/Hackathon/BrandMirror/frame_07.png', // AI Chatbot with live brand answers
  ];

  const TARGET_W = 800;
  const FRAME_H = 500;
  const totalH = frames.length * FRAME_H;

  // Resize each frame to exactly 800x500
  const buffers = [];
  for (const f of frames) {
    const buf = await sharp(f)
      .resize(TARGET_W, FRAME_H, { fit: 'cover', position: 'centre' })
      .toBuffer();
    buffers.push(buf);
  }

  // Create canvas and composite
  await sharp({
    create: {
      width: TARGET_W,
      height: totalH,
      channels: 4,
      background: { r: 13, g: 17, b: 23, alpha: 1 }
    }
  })
    .composite(buffers.map((buf, i) => ({ input: buf, top: i * FRAME_H, left: 0 })))
    .png({ quality: 90 })
    .toFile('public/assets/projects-screenshots/brandmirror/landing.png');

  const meta = await sharp('public/assets/projects-screenshots/brandmirror/landing.png').metadata();
  console.log(`Result: ${meta.width}x${meta.height} ratio: ${(meta.height / meta.width).toFixed(2)}`);
  console.log('Saved to public/assets/projects-screenshots/brandmirror/landing.png');

  // Also update the background from the best screenshot (dashboard)
  await sharp('D:/Hackathon/BrandMirror/frame_04.png')
    .resize(1200, 800, { fit: 'cover', position: 'top' })
    .blur(3)
    .jpeg({ quality: 80 })
    .toFile('public/assets/backgrounds/brandmirror.jpg');
  console.log('Background updated from sentiment analysis frame');
})();
