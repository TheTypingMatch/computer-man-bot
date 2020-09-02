const colors: any = {
    red: 0xE84444,
    yellow: 0xF09F19,
    green: 0x7289da
};

const version = '1.0.0';
const prefix = '+';
const devMode = false;
const logEnabled = process.env.LOG_ENABLED || false;
const uriParams: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    keepAlive: true
};

export {
    colors, version, prefix, 
    devMode, logEnabled, uriParams
};
