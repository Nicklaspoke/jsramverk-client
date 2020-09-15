// import react from 'react';
import { NotFound, Forbidden, ServerError } from '../components/layout/errorPages';

// import NotFound from '../components/layout/errorPages';
export default function getErrorPage(code) {
    switch (code) {
        case 403:
            return Forbidden;
        case 404:
            return NotFound;
        case 500:
            return ServerError;
        default:
            break;
    }
}
