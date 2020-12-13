class ImplementationNotExists extends Error {
    constructor(message?: string) {
        super();

        this.message = message || 'Your environment doesn\'t have EventSource implementation. Please, provide your own via "eventSource" prop.';
    }
}

export default ImplementationNotExists;