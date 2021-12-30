// Create an  export configuration variable

// container for all enviroments

let environment={}

// staging default environment
environment.staging={
 'httpPort':3004,
 'httpsPort':3005,
 'evName':'staging'
}

// Production environment
environment.production={
    'httpPort':5000,
    'httpsPort':5001,
    'evName':'production'
}