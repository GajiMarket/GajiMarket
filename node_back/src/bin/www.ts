import app from '../app'

const main = async() => {

    const PORT = process.env.PORT || '8000'

    app.listen(parseInt(PORT, 10), () => {

        console.log(`server is running on port ${PORT}`);
        
    });
}

main().catch(err => {

    console.error((err as Error).message);
    
})