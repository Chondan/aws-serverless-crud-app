import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

// --- functions ---
import {createTodo, getAllTodos, updateTodo, deleteTodo} from '@functions/todo';

  const serverlessConfiguration: AWS = {
    service: 'todo-api',
    frameworkVersion: '2',
    custom: {
      webpack: {
        webpackConfig: './webpack.config.js',
        includeModules: true,
      },
      'serverless-offline': {
        noPrependStageInUrl: true
      },
      dynamodb: {
        start: {
          port: 8000,
          inMemory: true,
          migrate: true
        },
        stages: ['test']
      },
      stage: 'test'
    },
    plugins: [
      'serverless-webpack', 
      'serverless-offline',
    'serverless-iam-roles-per-function',
    'serverless-dynamodb-local'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: '${opt:stage, self:custom.stage, "dev"}',
    region: '${opt:region, "ap-southeast-1"}' as any,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      TODOS_TABLE: 'Todos-${self:provider.stage}'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello, createTodo, getAllTodos, updateTodo, deleteTodo },
  resources: {
    Resources: {
      TodosDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:provider.environment.TODOS_TABLE}',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S' 
            }
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH'
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    },
  },
  package: {
    individually: true
  }
};

module.exports = serverlessConfiguration;
