export const HOSTNAME_URI = `${process.env.environment === 'development' ? 'http' : 'https'}://${process.env.HOSTNAME_URI}`;
export const PUBLICHOSTNAME = `${process.env.environment === 'development' ? 'http' : 'https'}://${process.env.NEXT_PUBLIC_HOSTNAME}`;
