'use strict'

// Helper methods
function getTime()
{
    return new Date().toISOString().substring(11, 23)
}



// Public methods
function info(...args)
{
    console.log(`[ INFO ] (${getTime()}):`, args.join(' '))
}

function warn(...args)
{
    console.warn(`[ WARN ] (${getTime()}):`, args.join(' '))
}

function error(...args)
{
    console.error(`[ ERROR ] (${getTime()}):`, args.join(' '))
}

module.exports =
{
    info: info,
    warn: warn,
    error: error
}