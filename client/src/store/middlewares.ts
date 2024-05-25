import { snakeCase } from "change-case";

export const convertToSnakeCaseMiddleware = (obj: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[snakeCase(key)] = obj[key];
      }
    }
    return result;
  };
