import { createBrowserRouter } from 'react-router';
import paths from '../config/paths';


export const createAppRouter = createBrowserRouter([
    // Home route
    {
        path: paths.home,
    }
]);