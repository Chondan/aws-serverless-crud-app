import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import {APIGatewayProxyResult} from 'aws-lambda';

// model
import {createTodoSchema} from '../model/todoSchema';

// services
import {TodoService} from '../services/todoServices';


const createTodo: ValidatedEventAPIGatewayProxyEvent<typeof createTodoSchema> = async (event): Promise<APIGatewayProxyResult> => {
    const {name} = event.body;

    const todoService = new TodoService();
    const todo = await todoService.createTodo(name);
    
    return {
        statusCode: 201,
        body: JSON.stringify({
            item: todo
        })
    };
}

export {createTodo};