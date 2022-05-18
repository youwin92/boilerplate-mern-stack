import {Carousel} from "antd";
import React from "react";

function ImageSlider(props){
  return(


      // <img style={{ width:'100%',maxHeight:'150px'}} src={`http://localhost:5000/${product.images[0]}`} />

      <Carousel autoplay>
        {
          props.images.map((image,index)=>(
            <div key={index}>
              <img style={{width:"100%", maxHeight:'150px'}}
                  src={`http://localhost:5000/${image}`}/>
            </div>
        ))
        }
      </Carousel>
  );
}


export default ImageSlider;