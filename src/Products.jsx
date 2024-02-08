import { Table, TableRow, TableCell, Label, TableColumn, Button, TableGrowingMode, Panel, Toolbar, Title, ToolbarSpacer, Icon, Toast } from '@ui5/webcomponents-react';
import { useEffect, useRef, useState } from 'react';
import { RatingIndicator } from '@ui5/webcomponents-react';
import { spacing, ThemingParameters } from "@ui5/webcomponents-react-base";
import navigationRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow";
import ProductDetailDialog from './ProductDetailDialog';
import { useNavigate } from 'react-router-dom';

function Products({ setEditRows }) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [openState, setOpenState] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const [maxRecord,setMaxRecord] = useState(100);
  //  var maxRecord = 100;
    const navigate = useNavigate();
    const toast = useRef(null);
    const showToast = (message) => {
        toast.current.innerHTML = message;
        toast.current.show();
    };
    useEffect(() => {
        //  const url = "products.json";
        const url = `http://localhost:3001/products?skip=${skip}&limit=${limit}`;
        //   const url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            const productList = data.products.map((product) => {
                const imagelist = product.images.map((image) => { return { url: image } });
                product.images = imagelist;
                //product.isSelected = false;
                if(data.total){
                    setMaxRecord(data.total);
                }
                return product;
            });
            setProducts(productList);
            setSkip(limit)
            setLimit(limit + 10);
          
           
        });
    }, []);
    const onLoadMore = async () => {
        //     const url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
        const url = `http://localhost:3001/products?skip=${skip}&limit=${limit}`;
        if (skip >= maxRecord) {
            return;
        }
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            const productList = data.products.map((product) => {
                const imagelist = product.images.map((image) => { return { url: image } });
                product.images = imagelist;
                // product.isSelected = false;
                return product;
            });
            setProducts([...products, ...productList]);
            setSkip(limit)
            setLimit(limit + 10);
        });

    }

    //setProducts(aaa);
    return (




        <Panel
            style={{ maxWidth: "100%" }}

            header={<Toolbar><Title>Products</Title><ToolbarSpacer /><Button
                onClick={
                    function _EditClicked(e) {
                        if (selectedRows.length == 0) {
                            showToast("No Rows Selected to Edit");
                            return;
                        }
                        const editData = products.filter((product) => {
                            return selectedRows.includes(product.id.toString());
                        });
                        setEditRows(editData);


                        navigate("/editproducts");
                    }}>Edit</Button>

                <Button design="Negative"
                    onClick={
                        async function _RemoveClicked(e) {
                            if (selectedRows.length == 0) {
                                showToast("No Rows Selected to Delete");
                                return;
                            }
                            const removeData = products.filter((product) => {
                                return selectedRows.includes(product.id.toString());
                            });
                            const url = 'http://localhost:3001/products/' + removeData[0].id; 
                            const response = await fetch(url, {
                                    method: 'DELETE',
                                   
                                    });
                                    const result = await response.json();
                                 console.log(result);
                                 if (result.message==="Removed Successfully"){
                                    const newData = products.filter((product) => {
                                        return product.id !== removeData[0].id
                                    });
                                    setProducts(newData);
                                    setMaxRecord(maxRecord - 1);
                                  
                                 }

                            // setEditRows(editData);


                           // navigate("/editproducts");
                        }}

                >Remove</Button>
                <Button design="Emphasized"
                  onClick={
                   function  _AddClicked(e) {
                        navigate("/addproduct");
                    }}>Add</Button>

                <Toast ref={toast} duration={3000} style={{ color: "#ebeb84" }}></Toast></Toolbar>}
            headerText="Panel"
            onToggle={function _a() { }}
        >
            <div className="sapScrollBar VerticalScrollbar-scrollbar-0-2-55" style={{ overflow: "scroll", height: "500px", overflowX: "hidden" }} >
                <Table
                    id="productTable"
                    mode="MultiSelect"
                    stickyColumnHeader="true"
                    onLoadMore={onLoadMore}
                    growing={TableGrowingMode.Scroll}
                    //  growing={TableGrowingMode.Button}
                    growingButtonText='More'

                    no-data-text="No Data"
                    columns={
                        <>
                            <TableColumn style={{ width: '2rem' }}><Label>Id</Label></TableColumn>
                            <TableColumn style={{ width: '5rem' }} demandPopin minWidth={400} popinText="Title"><Label>Title</Label></TableColumn>
                            <TableColumn style={{ width: '5rem' }} demandPopin minWidth={400} popinText="Description"><Label>Description</Label></TableColumn>
                            <TableColumn style={{ width: '5rem' }} demandPopin minWidth={400} popinText="Price"><Label>Price</Label></TableColumn>
                            <TableColumn style={{ width: '5rem' }} demandPopin minWidth={400} ><Label>Rating</Label></TableColumn>
                            <TableColumn style={{ width: '2rem' }} ><Label></Label></TableColumn>
                        </>
                    }
                    onPopinChange={function _a() { }}
                    onRowClick={function _a() { }}
                    onSelectionChange={
                        function _a(e, detail) {
                            const selectedRows = e.detail.selectedRows
                            const selectedRowData = e.detail.selectedRows.map((row) => {
                                return row.id;
                            });
                            setSelectedRows(selectedRowData);
                            //  let selectedData = products.filter((product) => {
                            //      return product.isSelected
                            //  }
                            //  );
                        }
                    }
                >
                    {products.length > 0 && products.map((product) => {
                        return (
                            <TableRow key={product.id} id={product.id} >
                                <TableCell>
                                    <Label style={{ width: '2rem' }}>
                                        {product.id}
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <Label style={{ width: '8rem' }}>
                                        {product.title}
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <Label style={{ width: '15rem' }}>
                                        {product.description}
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <Label style={{ width: '8rem' }}>
                                        {product.price}
                                    </Label>
                                </TableCell>
                                <TableCell>
                                    <RatingIndicator style={{ width: '10rem' }} value={product.rating} readonly="true" />
                                    {/* <Label style={{ width: '8rem' }}>
                            {product.rating}
                        </Label> */}
                                </TableCell>
                                <TableCell>

                                    <Icon interactive
                                        onClick={function _navigate(e) {
                                            setOpenState(true);
                                            setDialogData(product);
                                        }}
                                        name={navigationRightArrow}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}

                </Table>
                <ProductDetailDialog openState={openState} data={dialogData} setOpenState={setOpenState}></ProductDetailDialog>
            </div>
        </Panel>

    )
}
export default Products;