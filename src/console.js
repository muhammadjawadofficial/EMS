const customConsole = {
    log(x){
        if(process.env.NODE_ENV == 'development')
            console.log(x)
    }
}

export default customConsole