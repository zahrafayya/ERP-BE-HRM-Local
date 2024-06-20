import { MessagesKey } from "./messagesKey";

export const messages_en = {
    // Common Error messages
    [MessagesKey.NODATAFOUND]: "No data found",
    [MessagesKey.INTERNALSERVERERROR]: "Internal server error",
    [MessagesKey.UNKNOWNERROR]: "An unknown error occurred",
    [MessagesKey.BADREQUEST]: "Bad request.",
    [MessagesKey.UNAUTHORIZED]: "Unauthorized.",
    [MessagesKey.SPESIFICDATANOTFOUND]: "{0} not found.",
    [MessagesKey.ERRORCREATION]: "Failed to create {0}. The creation method did not return a valid model instance.",

    // Common Success messages
    [MessagesKey.SUCCESSGET]: "Data has been found.",
    [MessagesKey.SUCCESSGETBYID]: "Data has been found by the specified criteria.",
    [MessagesKey.SUCCESSCREATE]: "Data has been created.",
    [MessagesKey.SUCCESSBULKCREATE]: "Data has been bulk created.",
    [MessagesKey.SUCCESSUPDATE]: "Data has been updated.",
    [MessagesKey.SUCCESSBULKUPDATE]: "Data has been bulk updated.",
    [MessagesKey.SUCCESSDELETE]: "Data has been deleted.",
    [MessagesKey.SUCCESSSOFTDELETE]: "Data has been soft deleted.",

    // Repository messages
    [MessagesKey.ERRORMISSINGTOKEN]: "Error fetching token.",
    [MessagesKey.ERRORINVALIDTOKEN]: "Error invalid token.",
    [MessagesKey.ERRORFINDINGALL]: "Error finding all instances",
    [MessagesKey.ERRORFINDINGBYID]: "Error finding instance by ID",
    [MessagesKey.ERRORCREATE]: "Error occurred while creating the data.",
    [MessagesKey.ERRORBULKCREATE]: "Error occurred while bulk creating data.",

    // Business Logic messages
    [MessagesKey.INVOICEALREADYEXISTS]: "An invoice associated with the provided sales order code {0} already exists.",
};
