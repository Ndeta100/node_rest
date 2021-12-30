
// Dependencies
const http=require('http')
const url=require('url')
const https=require('https')
const StringDecoder=require('string_decoder').StringDecoder
// The server should respond to all requests with a string
const server=http.createServer(function(req,res){
    // Get the url and parse it
const parsedUrl=url.parse(req.url,true)
    // Get the path from the url
const path=parsedUrl.pathname
const trimmedPath=path.replace(/^\/+|\/+$/g,'')
    // Get the query string as an object
const queryStringObject=parsedUrl.query
    // Get the http method
const method=req.method.toLowerCase()

    // Get the Headers as an object
    const headers=req.headers

    // Get the payload if any
    const decoder=new StringDecoder('utf-8')
    let buffer=''
    req.on('data', function(data){
      buffer +=decoder.write(data)
    })
    req.on('end', function(){
        buffer +=decoder.end()
    //    Choose the handler this request should go to, if one is not found use the notFound route
    const choosenHandler=typeof(router[trimmedPath])!=='undefined'  ? router[trimmedPath] : handlers.notFound
    // construct data object and send to handler
    const data={
        'trimmedPath':trimmedPath,
        'queryStringObject':queryStringObject,
        'method':method,
        'headers':headers,
        'payload':buffer
    }
    // Route the request to the handler specified in the router
    choosenHandler(data, function(statusCode, payload){
        // use the statusCode callback by the handler or default to 200
        statusCode=typeof(statusCode)=='number' ? statusCode :200
        // Use the payload callback by the handler or default to an empty object
        payload=typeof(payload)=='object' ? payload: {}

        // Convert th epayload to a string
        const payloadString=JSON.stringify(payload)
        // Return the response
        res.writeHead(statusCode)
        res.end(payloadString)
         // Log the request 
    console.log('We are returning this response :', statusCode, payloadString)
    })

    })
    // console.log('Request is received on path: ' +trimmedPath+ ' with method ' + method +  '  and with these query string parameter :' ,JSON.stringify(queryStringObject))
})
const port=3004
server.listen(port, console.log(`App running on port ${port}`))


// Define handlers
const handlers={}
// Sample handler

handlers.sample=function(data, callback){
// Callback a http status code and a payload & that payload should be an object
callback(406, {'name':"sample handler"})
}
// Not found handler
handlers.notFound=function(data, callback){
callback(404)
}
// Define a req router
const router={
    'sample':handlers.sample
}