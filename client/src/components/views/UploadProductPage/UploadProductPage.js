import React,{ useState} from "react";
import { Typography, Button, Form, Input} from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from 'axios';


// const {Title} = Typography;
const {TextArea} = Input;

const Continents =[
  {key:1, value:"아프리카"},
  {key:2, value:"유럽"},
  {key:3, value:"아시아"},
  {key:4, value:"북아메리카"},
  {key:5, value:"남아메리카"},
  {key:6, value:"오스트레일리아"}
];

function UploadProductPage(props){

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) =>{
    setTitle(event.currentTarget.value);
  }
  const descriptionChangeHandler = (event) =>{
    setDescription(event.currentTarget.value);
  }
  const priceChangeHandler = (event) =>{
    setPrice( event.currentTarget.value);
  }

  const continentChangeHandler = (event) =>{
    setContinent(event.currentTarget.value);
  }

  const updateImages = (newImages) =>{
    setImages(newImages);
  }
  const submitHandler = (event) => {
    event.preventDefault();

    if(!Title || !Description || !Price || !Continent || !Images){
      return alert("모든 값을 넣어 주셔야 합니다");
    }

    //서버에 채운 값들을 request로 보낸다
    const body = {
      //로그인 된 사람의 ID
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continents : Continent
    };

    axios.post("/api/product/", body)
      .then(response =>{
        if( response.data.success){
          alert("상품 업로드 성공");
          //업로드 이후 렌딩페이지로 이동
          props.history.push("/");
        }else{
          alert("상품 업로드 실패");
        }
      })
  }

  return(
      <div style={{maxWidth:'700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
          <h2 level={2}>여행 상품 업로드</h2>
        </div>

        <Form onSubmitCapture={submitHandler}>
         <FileUpload refreshFunction={updateImages}/>


          <br /> 
          <br /> 
          <label>이름</label>
          <Input value={Title} onChange={titleChangeHandler}/>
          <br /> 
          <br /> 
          <label>설명</label>
          <TextArea onChange={descriptionChangeHandler} value={Description}/>
          <br /> 
          <br /> 
          <label>가격</label>
          <Input type="number" value={Price} onChange={priceChangeHandler}/>
          <br />
          <br />          
          <select onChange={continentChangeHandler} value={Continent}>
            {Continents.map( item => (
              <option key={item.key} value={item.key}>{item.value}</option>
            ))}

          </select>
          <br /> 
          <br /> 
          <Button htmlType='submit'>확인</Button>
        </Form>
      </div>
  )
}
export default UploadProductPage