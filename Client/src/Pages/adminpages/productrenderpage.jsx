const ProductRender=()=>{
    return(
        <Box flex={6} >
                <Box  sx={{
                    position:"relative",
                    marginTop:"50px",
                }} >
                    <div style={{position:"relative", display:"flex",flexDirection:"row",flexWrap:"wrap"}} >
                    <div className="auctiondescription" style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"500px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"#51784C"}}>
                            <div style={{
                                position:"absolute",
                                width:"30%",
                                height:"50%",
                                backgroundColor:"#D1D9D0",
                                
                            }} ></div>
                            <div style={{position:"absolute",left:"32%",backgroundColor:"white"}}>
                                <p>Auction Id - <b>564654216546541</b></p>
                                <ListItem>
                                    
                                </ListItem>
                            <div>
                            </div>
                            
                            </div>
                    </div>
                    
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"brown"}}>

                    </div>
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"brown"}}>

                    </div>
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"brown"}}>

                    </div>
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"brown"}}>

                    </div>
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"brown"}}>

                    </div>
                    </div>

            <div style={{
        position:"relative",
        height:"50px",
        marginTop:"10px",
        backgroundColor:"yellow",
      }}> <Pagination count={10} color="primary" page={1} sx={{position:"relative" }}/>
            </div>
                </Box>
            </Box>
    )
}