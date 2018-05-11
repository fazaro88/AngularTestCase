// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    urls: {
        'API': 'http://angular-test.rh-dev.eu:8000/',
        'baseAPI': 'api/',
        'users': 'users/'
    },
    token: 'Token 635821559293-bpkuhj0v8tr87c287h5alknhi6a933vr.apps.googleusercontent.com'
};
