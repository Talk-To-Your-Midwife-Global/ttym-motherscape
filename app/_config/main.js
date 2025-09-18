export const HOSTNAME_URI = `${process.env.environment === 'development' ? 'http' : 'https'}://${process.env.HOSTNAME_URI}`;
export const PUBLICHOSTNAME = `${process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'http' : 'https'}://${process.env.NEXT_PUBLIC_HOSTNAME}`;
export const CURRENTROUTE = process.env.NEXT_PUBLIC_CLIENT_ROUTE;


