export interface Theme {
    name: 'light' | 'dark';
    properties: {
        [key: string]: string;
    };
}

export interface ThemeConfig {
    current: Theme['name'];
    autoDetect: boolean;
}

