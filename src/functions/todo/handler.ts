import 'source-map-support/register';

// import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

// http
import {createTodo as _createTodo} from './http/createTodo';
import {getAllTodos as _getAllTodos} from './http/getAllTodos';
import {updateTodo as _updateTodo} from './http/updateTodo';
import {deleteTodo as _deleteTodo} from './http/deleteTodo';

export const createTodo = middyfy(_createTodo);
export const getAllTodos = middyfy(_getAllTodos);
export const updateTodo = middyfy(_updateTodo);
export const deleteTodo = middyfy(_deleteTodo);
