import React, {useState} from 'react';
import { Typography, Button, Form, Input } from 'antd';
import Fileupload from '../../Utils/Fileupload';
import Axios from 'axios';

const { TextArea } = Input;

const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" }
]


function UploadProductPage(props) {


    const [Tilte, setTilte] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [Continent, setContinent] = useState(1);
    const [Images, setImages] = useState([]);

    const titleChangeHandler = (e) => {
        setTilte(e.currentTarget.value)
    }

    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value)
    }

    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value)
    }

    const continentsChangeHandler = (e) => {
        setContinent(e.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(!Tilte || !Description || !Price || !Continent || !Images) {
            return alert("모든 값을 넣어주셔야 합니다.")
        }

        const body = {
            //로그인된 사람의 id
            writer: props.user.userData_id,
            title: Tilte,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }

        //서버에 채운 값을 request로 보낸다
        Axios.post("/api/product", body)
        .then(response => {
            if(response.data.success){
                alert('상품 업로드에 성공했습니다.')
                props.history.push('/')
            }else{
                alert('상품 업로드에 실패했습니다.')
            }
        })


    }


    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2>여행 상품 업로드</h2>
            </div>

            <Form onSubmit={submitHandler}>
                {/* Dropzone */}
                <Fileupload refreshFunction={updateImages}/>



                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Tilte}/>
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br />
                <br />
                <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <select onChange={continentsChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.value}>{item.value}</option>
                    ))}
                    
                </select>
                <br />
                <br />
                <Button type="submit"
                    onClick={submitHandler}>
                    확인
                </Button>

            </Form>
        </div>
    )
}

export default UploadProductPage
