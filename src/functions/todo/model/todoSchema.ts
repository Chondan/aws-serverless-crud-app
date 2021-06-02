const createTodoSchema = {
    type: "object",
    properties: {
        name: { type: 'sting' }
    },
    required: ['name']
}

export {createTodoSchema};