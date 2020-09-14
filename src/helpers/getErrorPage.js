// import react from 'react';
import { NotFound, Forbidden, ServerError } from '../components/layout/errorPages';

// import NotFound from '../components/layout/errorPages';
export default function getErrorPage(code) {
    switch (code) {
        case 400:
            return;
        case 403:
            return Forbidden;
            break;
        case 404:
            return NotFound;
            break;
        case 500:
            return ServerError;
            break;
    }
}
