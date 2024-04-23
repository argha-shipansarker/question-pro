import axios from 'axios';
import { baseURL } from './constants';

interface configProps {
    URL: string;
    params?: any;
}

export async function Get(config: configProps) {
    return await axios.get(
        `${baseURL}${config.URL}`,
        {
            params: config.params ?? {},
        }
    );
}