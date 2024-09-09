import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function DELETE(request) {
    try {
        // Parse the request body
        const { key } = await request.json();

        if (!key || typeof key !== 'string') {
            return NextResponse.json({ error: 'No file key provided or invalid key' }, { status: 400 });
        }

        // Prepare the S3 delete parameters
        const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        };

        // Delete the file from S3
        const command = new DeleteObjectCommand(deleteParams);
        await s3Client.send(command);

        return NextResponse.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}



// curl -X DELETE http://localhost:3000/api/delete -H "Content-Type: application/json" -d '{"key": "uploads/1725407078996_img1.jpg"}'