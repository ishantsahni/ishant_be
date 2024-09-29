const { S3Client } = require('@aws-sdk/client-s3');

// Configure the AWS SDK with credentials and region
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // From environment variables
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // From environment variables
  }
});

module.exports = s3;
