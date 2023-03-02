import { DEFAULT_HEADERS, STATUS_CODES } from "../constants";
import { winstonLogger } from "./logger";

interface ResponseInterface {
    statusCode: number
    headers: Object,
    body: Object
}

const errorResponse = ( error: Error, statusCode: number = STATUS_CODES.INTERNAL_SERVER_ERROR ): ResponseInterface => {
    winstonLogger.logError( `Error: ${ JSON.stringify(error.message)  }` );

    return {
        statusCode,
        headers: {
            ...DEFAULT_HEADERS
        },
        body: JSON.stringify( { message: error.message || 'Something went wrong !!!' })
    }
}

const successResponse = ( body: Object, statusCode: number = STATUS_CODES.OK ): ResponseInterface => {
    winstonLogger.logRequest( `Lambda successfully invoked and finished` );

    return {
        statusCode,
        headers: {
            ...DEFAULT_HEADERS
        },
        body: JSON.stringify(body)
    }
}

export { errorResponse, successResponse };
export type { ResponseInterface };
