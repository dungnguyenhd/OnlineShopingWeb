import React, { useEffect,useState,useContext } from 'react'
import ProductServices from '../../services/ProductServices';
import { Link,useNavigate } from 'react-router-dom';
import {
    MDBValidation,
    MDBValidationItem,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import StoreService from '../../services/StoreService';
import { UserContext } from "../../App";

function AddNewProduct() {
    const getUser = useContext(UserContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productAddress: '',
        productAmount:'',
        productDate:'',
        productImage:'',
        productNewPrice:'',
        productOldPrice:'',
        productType:'',
        productDescription:'',
        store:{
            storeId: '',
        }
    });
    const [store, setStore] = useState([]);

    useEffect(() => {
        // let initData = {};
        // initData.store = {};
        // setProduct(initData);
        if (getUser) {
            StoreService.getStoreByUser(getUser.id).then((res) => {
                setStore(res.data);
            })
      }},[]);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = { ...product };
        product.store.storeId = store.storeId;
        data[name] = value;
        setProduct(data);
    }

    // useEffect(()=>{
    //     let data = {...product};
    //     data.store.storeId = store.storeId;
    //     setProduct(data);
    // },[store])

    // const handleChangeStore = (event) => {
    //     console.log(event);
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     let data = {...product};
    //     data.store[name] = value;
    //     setProduct(data);
    //     console.log('test product' + product)
    //   };

    const saveProduct = (event) => {
        ProductServices.addNewProduct(product).then(res => {
            console.log('save success!');
            navigate(-1);
        });
    }

    const cancel = () =>{
        navigate(-1);
    }

    if(getUser){
    return (
        <>
        <div style={{backgroundColor: 'rgb(246, 239, 239)'}}>
        <div className='pt-3' style={{backgroundColor: 'rgb(246, 239, 239)'}}></div>
        <div className='container col-md-8 bg-light pt-2'>
            <h2> Th??m s???n ph???m m???i <hr/> </h2>
            <div className='row pt-4 pb-3'>
            <div className='col-md-6'> <img className='img-fluid' style={{aspectRatio: 1 / 1.02}} src={product.productImage} alt='no-image'/> </div>
            <div className='col-md-6'>
                <MDBValidation className='row g-3'>
                    <div className='col-md-3'><label> Xu???t x???: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid address.' invalid>
                        <MDBInput
                            placeholder='?????a ch???' name='productAddress'
                            className='form-control' value={product.productAddress}
                            onChange={(e) => handleChange(e)} 
                            required/>
                    </MDBValidationItem>
                    </div>
                    {/* --------------------------------------------------------- */}

                    <div className='col-md-3'><label> T??n s???n ph???m: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid name.' invalid>
                        <MDBInput
                            placeholder='Product Name' name='productName' className='form-control' value={product.productName} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>

                    {/* --------------------------------------------------------- */}

                    <div className='col-md-3'><label> S??? l?????ng trong kho: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid amount.' invalid>
                        <MDBInput
                            placeholder='Product Card Number' type='number' name='productAmount' className='form-control' 
                            value={product.productAmount} onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>

                    {/* --------------------------------------------------------- */}

                    <div className='col-md-3'><label> Ng??y nh???p: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid card date.' invalid>
                        <MDBInput
                            placeholder='Product Date' name='productDate' className='form-control' value={product.productDate} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>

                    {/* --------------------------------------------------------- */}

                    <div className='col-md-3'><label> ???nh: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid card url.' invalid>
                        <MDBInput
                            placeholder='Product Image URL' name='productImage' className='form-control' value={product.productImage} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>

                    {/* --------------------------------------------------------- */}

                    <div className='col-md-3'><label> Gi?? s???n ph???m: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='Product New Price' type='number' name='productNewPrice' className='form-control' value={product.productNewPrice} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>

                    {/* --------------------------------------------------------- */}

                    <div className='col-md-3'><label> Gi?? th??? tr?????ng: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='Gi?? th??? tr?????ng' type='number' name='productOldPrice' className='form-control' value={product.productOldPrice} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>

                    <div className='col-md-3'><label> Ph??n lo???i s???n ph???m: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='Ph??n lo???i s???n ph???m' name='productType' className='form-control' value={product.productType} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>

                    <div className='col-md-3'><label> M?? t??? ph???m: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='M?? t??? s???n ph???m' name='productDescription' className='form-control' value={product.productDescription}
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>

                    {/* <label> M?? store: </label>
                    <MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='M?? t??? s???n ph???m' name='storeId' className='form-control' value={product.storeId} 
                            onChange={(e) => handleChangeStore(e)}
                            required/>
                    </MDBValidationItem> */}

                    {/* --------------------------------------------------------- */}
                    <div className='col-12'>
                        <MDBBtn type='submit' className='btn btn-info me-2' onClick={(e) => saveProduct(e)}>L??u</MDBBtn>
                        <MDBBtn type='reset' className='btn btn-danger me-2'>?????t l???i</MDBBtn>
                        <button className='btn btn-secondary me-2' onClick={()=>cancel()}> H???y </button>
                    </div>
                </MDBValidation>
            </div>
            </div>

        </div>
        </div>
        <div className='pt-5' style={{backgroundColor: 'rgb(246, 239, 239)'}}></div>
        </>
    )
    }
    else{
        navigate("/login");
    }
}

export default AddNewProduct;
