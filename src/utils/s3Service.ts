import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export const generatePreSignedUrl = async (key: string, fileType: string) => {
  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  return { uploadUrl };
};

export const deleteFileFromS3 = async (fileKey: string) => {
  const command = new DeleteObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: fileKey,
  });

  await s3.send(command);
};
