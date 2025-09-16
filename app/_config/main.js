export const HOSTNAME_URI = `${process.env.environment === 'development' ? 'http' : 'https'}://${process.env.HOSTNAME_URI}`;
export const PUBLICHOSTNAME = `${process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'http' : 'https'}://${process.env.NEXT_PUBLIC_HOSTNAME}`;
export const currentRoute = `${process.env.environment === 'development' ? 'http://localhost:3000' : 'https://app.talktoyourmidwife.com'}`;

