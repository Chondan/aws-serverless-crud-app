import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { TodoItem } from "../model/todoItem";
import { TodoService } from "../services/todoServices";

const updateTodo: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const {id} = event.pathParameters;

    console.log({id})
    
    const todoService = new TodoService();
    const body: Object = event.body;
    const todo: Partial<TodoItem> = {...body, id};

    const todoUpdated = await todoService.updateTodo(todo);

    return {
        statusCode: 200,
        body: JSON.stringify({
            item: todoUpdated
        })
    }
}

export {updateTodo};