import { CommentParams, PostParams } from "../utils/interface";
import { Get } from "./api-request-service";

export function GetPosts(params?: PostParams) {
    return Get({
        URL: '/posts',
        params
    });
}

export function GetComments(params?: CommentParams) {
    return Get({
        URL: '/comments',
        params
    });
}

export function GetUsers() {
    return Get({
        URL: '/users',
    });
}