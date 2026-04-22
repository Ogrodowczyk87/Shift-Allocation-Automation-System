import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const region = process.env.AWS_REGION!
const bucketName = process.env.S3_BUCKET_NAME!
const cloudFrontDomain = process.env.CLOUDFRONT_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '')

const s3 = new S3Client({ region })

export async function createEmployeePhotoUpload(params: {
  fileKey: string
  fileType: string
}) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: params.fileKey,
    ContentType: params.fileType,
  })

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 })
  const fileUrl = cloudFrontDomain
    ? `https://${cloudFrontDomain}/${params.fileKey}`
    : `https://${bucketName}.s3.${region}.amazonaws.com/${params.fileKey}`

  return {
    uploadUrl,
    fileUrl,
    fileKey: params.fileKey,
  }
}
