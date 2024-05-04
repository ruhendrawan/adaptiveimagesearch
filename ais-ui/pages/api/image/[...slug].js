import fs from 'fs';
import path from 'path';

// Only assets that are in the public directory at build time will be served by Next.js. Files added at request time won't be available. 
// https://nextjs.org/docs/pages/building-your-application/optimizing/static-assets
// https://github.com/vercel/next.js/discussions/18005
// https://github.com/vercel/next.js/discussions/16417

export const config = {
    api: {
        externalResolver: true,
    },
}

export default function handler(req, res) {
    if (req.query.slug && req.query.slug.length) {

        try {
            const fileUrl = req.query.slug.join("/")
            const filePath = path.join(process.cwd(), 'public/images', fileUrl);
            // console.log(filePath);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        return res.status(404).json({ error: 'File not found' });
                    } else {
                        return res.status(500).json({ error: 'Failed to read file' });

                    }
                } else {
                    res.setHeader("Content-Type", "image/jpg");
                    return res.status(200).send(data);
                }
            })
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch file' });
        }
    } else {
        return res.status(404).send(null);
    }
}
