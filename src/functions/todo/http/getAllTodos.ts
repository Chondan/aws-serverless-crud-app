import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

// service
import {TodoService} from '../services/todoServices';

const getAllTodos: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
    const todoService = new TodoService();
    const items = await todoService.getAllTodos();

    return {
        statusCode: 201,
        body: JSON.stringify({
            items
        })
    }
}

export {getAllTodos};