import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import ProductServices from "../../services/ProductServices";
import StoreService from "../../services/StoreService";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function StoreAdmin() {
    const getUser = useContext(UserContext);
    const [store, setStore] = useState({});
    const [product, setProduct] = useState([]);
    const [productAmount, setProductAmount] = useState(null);
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        if (getUser.length !== 0) {
            StoreService.getStoreByUser(getUser.id).then((res) => {
                setStore(res.data);
                ProductServices.getProductByStore(res.data.storeId).then((res) => {
                    setProductAmount(res.data);
                });
                ProductServices.getStoreProduct(res.data.storeId).then((res) => {
                    setProduct(res.data);
                })
            })
        }
    }, []);

    const productPerPage = 8;
    const pagesVisited = pageNumber * productPerPage;

    const pageCount = Math.ceil(product.length / productPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const sortPriceDown = () => {
        const sortData = [...product];
        sortData.sort((a, b) => a.productNewPrice - b.productNewPrice);
        setProduct(sortData);
    };

    const sortPriceUp = () => {
        const sortData = [...product];
        sortData.sort((a, b) => b.productNewPrice - a.productNewPrice);
        setProduct(sortData);
    };

    var listProduct = [];
    if (product.length !== 0) {
        listProduct = product.slice(pagesVisited, pagesVisited + productPerPage).map((product) => (
            <div className="col-xl-3 col-md-3 mb-3 mt-1 " key={product.productId}>
                <Link className="product-link" to={'/product/'+product.productId}>
                <div className="card" style={{ textAlign: 'left', fontSize: '.9rem', width: '12.5rem' }}>
                    <img src={product.productImage} className="img-fluid" alt="no-image" style={{aspectRatio: 1 / 1.02}}/>
                    <div className="card-body">
                        <p className="card-title textOverflow " style={{ textTransform: 'uppercase', textAlignLast: 'justify', }}>{product.productName}</p>
                        <p><span style={{ backgroundColor: '#26aa99', padding: '3px', fontSize: '.6rem', fontWeight: 'bold', fontStyle: 'italic', color: 'rgb(250, 247, 247)' }}> <i className="fa fa-shipping-fast"></i>&#160; FREE SHIP</span></p>
                        <p className="card-text" style={{ textAlignLast: 'justify', }}><span style={{ color: 'grey', textDecoration: 'line-through', fontStyle: 'italic', fontSize: '.9rem' }}><sup>??</sup>{product.productOldPrice.toLocaleString("en-US")}</span> &#160;
                            <span style={{ color: 'rgb(255, 38, 0)', fontSize: '1rem' }}><sup>??</sup>{product.productNewPrice.toLocaleString("en-US")}</span> </p>
                    </div>
                </div>
                </Link>
            </div>
        ));
    }
    else{
        listProduct = <h6> C???a h??ng ch??a c?? s???n ph???m n??o </h6>
    }

    if (store.length === 0 && getUser.length !== 0) {
        return (
            <>
                <h1> C?? v??? nh?? b???n ch??a c?? c???a h??ng n??o </h1>
                <Link to='/addNewStore'><button className="btn btn-info"> T???o c???a h??ng </button></Link>
            </>
        )
    }
    else if (!getUser) {
        navigate("/login");
    }
    else {
        return (
            <>
                <div style={{ backgroundColor: 'rgb(246, 239, 239)' }}>
                    <div className="container pt-3">
                        <div className="row pt-3 pb-2" style={{ backgroundColor: 'white', borderRadius: '5px' }}>

                            <div className="col-md-4 text-light">
                                <div className="card p-1" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb")' }}>
                                    <div className="d-flex justify-content-between align-items-center p-2">
                                        <div className="ps-2"> <img src={store.storeImageURL} className="img-fluid rounded-circle" style={{ width: '100px', border: '5px solid lightgrey' }} /> </div>
                                        <div className="flex-column lh-1 imagename pe-2"> <span className="h5">{store.storeName}</span> <br></br> <span>{store.storeAddress}</span> <br/><br/> <Link to='/productManager' style={{paddingTop: '3px'}}><button className="btn btn-info" style={{padding: '3px'}}> Qu???n l?? s???n ph???m </button></Link> </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="d-flex justify-content-between align-items-center p-2">
                                    <div> <p style={{ textAlign: 'left' }}> <i className="fa fa-store"></i> T???ng s???n ph???m: <span className="text-danger">{productAmount}</span>  </p>
                                        <p style={{ textAlign: 'left' }}> <i className="fa fa-user"></i> Ng?????i theo d??i:  <span className="text-danger">200</span>  </p>
                                        <p style={{ textAlign: 'left' }}> <i className="fa fa-star"></i> ????nh gi??:  <span className="text-danger">5.0/5 (70k l?????t)</span> </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div> <p style={{ textAlign: 'left' }}> <i className="fa fa-user-check"></i> ??ang theo: <span className="text-danger">5</span>  </p>
                                    <p style={{ textAlign: 'left' }}> <i className="fa fa-comment"></i> T??? l??? ph???n h???i:  <span className="text-danger">200</span>  </p>
                                    <p style={{ textAlign: 'left' }}> <i className="fa fa-phone"></i> Li??n h???:  <span className="text-danger">{store.storePhone}</span> </p>
                                </div>
                            </div>

                            <div className="col-md-1"></div>
                        </div>

                        <div className="row mt-3 pt-2">
                            <div className="col-md-2">
                                <p className="pt-3 ps-2" style={{ textAlign: 'left' }}> <i className="fa fa-list"></i> &#160; Danh m???c </p>
                                <hr></hr>

                                <p className="ps-2" style={{ textAlign: 'left' }}> T???t c??? </p>

                                {/* <p className="ps-2" style={{ textAlign: 'left' }}> B??n ch???y </p>

                                <p className="ps-2" style={{ textAlign: 'left' }}> M???i </p> */}
                            </div>

                            <div className="col-md-10" style={{ backgroundColor: 'white', borderRadius: '3px' }} >
                                <div className="container-fluid mt-2 pb-2" style={{ textAlign: 'left', backgroundColor: 'rgb(247, 242, 242)', borderRadius: '3px' }}>
                                    S???p x???p theo &#160;&#160;
                                    <div className="dropdown">
                                        <button className="dropbtn pb-1">Gi?? &#160; &#160; &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
                                            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</button>
                                        <div className="dropdown-content">
                                            <a onClick={() => sortPriceUp()}>T??ng d???n</a>
                                            <a onClick={() => sortPriceDown()}>Gi???m d???n</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="container-fluid">
                                    <ReactPaginate
                                        previousLabel={"<"}
                                        nextLabel={">"}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"paginationBttns"}
                                        previousLinkClassName={"previousBttn"}
                                        nextLinkClassName={"nextBttn"}
                                        disabledClassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    />
                                    <div className="row">
                                        {listProduct}
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="pt-5"></div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}