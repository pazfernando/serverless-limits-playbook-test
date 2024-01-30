#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();

const targetRegion = 'us-west-2';
const targetAccount = 'XXXXXXXXXXXX';

new InfraStack(app, 'InfraStack', {
  env: { account: targetAccount, region: targetRegion },
});