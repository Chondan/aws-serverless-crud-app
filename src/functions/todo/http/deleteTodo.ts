import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { TodoService } from "../services/todoServices";

const deleteTodo: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const {id} = event.pathParameters;

    const todoService = new TodoService();
    await todoService.deleteTodoById(id);

    return {
        statusCode: 200,
        body: JSON.stringify({
            DeletedItem: id
        })
    }
}

export {deleteTodo};