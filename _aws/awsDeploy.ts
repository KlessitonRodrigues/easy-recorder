import * as cdk from "aws-cdk-lib";
import * as cloudFront from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";

export class WebAppStack extends cdk.Stack {
  constructor(scope: cdk.App, props?: cdk.StackProps) {
    super(scope, "SallerWebsiteStack", props);

    const distBucket = new s3.Bucket(this, "SallerWebsite", {
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const distOrigin = new cloudFront.OriginAccessIdentity(
      this,
      "SallerWebsiteOrigin"
    );
    distBucket.grantRead(distOrigin);

    const distribution = new cloudFront.CloudFrontWebDistribution(
      this,
      "SallerWebsiteDist",
      {
        defaultRootObject: "index.html",
        errorConfigurations: [
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: "/index.html",
          },
        ],
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: distBucket,
              originAccessIdentity: distOrigin,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                compress: true,
                forwardedValues: {
                  queryString: true,
                  cookies: { forward: "all" },
                },
              },
            ],
          },
        ],
      }
    );

    new s3Deploy.BucketDeployment(this, "SallerWebsiteBucket", {
      sources: [s3Deploy.Source.asset("../dist")],
      destinationBucket: distBucket,
      distribution,
    });
  }
}

const app = new cdk.App();
new WebAppStack(app);
