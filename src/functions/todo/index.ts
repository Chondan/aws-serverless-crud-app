import { handlerPath } from '@libs/handlerResolver';
import {createTodoSchema} from './model/todoSchema';

const createTodo = {
  handler: `${handlerPath(__dirname)}/handler.createTodo`,
  events: [
    {
      http: {
        method: 'post',
        path: 'todos',
        request: {
          schema: {
            'application/json': createTodoSchema 
          }
        }
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:PutItem'
      ],
      Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TODOS_TABLE}'
    }
  ]
}

const getAllTodos = {
  handler: `${handlerPath(__dirname)}/handler.getAllTodos`,
  events: [
    {
      http: {
        method: 'get',
        path: 'todos',
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:Scan'
      ],
      Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TODOS_TABLE}'
    }
  ]
}

const updateTodo = {
  handler: `${handlerPath(__dirname)}/handler.updateTodo`,
  events: [
    {
      http: {
        method: 'put',
        path: 'todo/{id}',
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:UpdateItem'
      ],
      Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TODOS_TABLE}'
    }
  ]
}

const deleteTodo = {
  handler: `${handlerPath(__dirname)}/handler.deleteTodo`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'todo/{id}',
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:UpdateItem'
      ],
      Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TODOS_TABLE}'
    }
  ]
}

export {createTodo, getAllTodos, updateTodo, deleteTodo};
