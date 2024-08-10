import { collection, getDocs, where, query, getFirestore, setDoc, doc } from 'firebase/firestore'; 
import React, { useEffect, useState } from 'react'; 
import { app } from '../../../firebase';

function PurchaseMaterial() { 
    const db = getFirestore(app); 
    const [allproducts, setAllProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [quantity, setQuantity] = useState({}); // Store quantity for each product

    useEffect(() => { 
        const fetchCards = async () => { 
            const productsQuery = query(collection(db, 'vendors')); 
            const vendorsQuery = query(collection(db, 'users'), where('role', '==', 'vendor')); 
 
            const productsSnapshot = await getDocs(productsQuery); 
            const vendorsSnapshot = await getDocs(vendorsQuery); 
 
            const vendorList = vendorsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); 
            const productsList = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));  
            setAllProducts(productsList); 
            setVendors(vendorList); 
        }; 
 
        fetchCards(); 
    }, []);
    
    const getVendorName = (vendorid) => {
        const vendor = vendors.find(v => v.id === vendorid);
        return vendor ? vendor.Username : 'Unknown Vendor';
    };

    const addOrder = async (product) => {
        const randomAlphaNumeric = (length) => { 
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
            let result = ''; 
            for (let i = 0; i < length; i++) { 
              result += chars.charAt(Math.floor(Math.random() * chars.length)); 
            } 
            return result; 
        };
         
        const id = randomAlphaNumeric(10); 
        console.log('Generated ID:', id); 

        const userdata = JSON.parse(localStorage.getItem('userData')); // Assuming user data is stored in localStorage
        if (!userdata) {
            console.error('User data not found in localStorage');
            return;
        }

        const orderRef = collection(db, 'orders');
        const orderdoc = doc(orderRef, id);

        await setDoc(orderdoc, {  // Use orderdoc here instead of orderRef
            orderid: id,
            vendorid: product.vendorid,
            quantity: quantity[product.id] || 1, // Default quantity to 1 if not specified
            farmerid: userdata.uid,
            approve: false,
            date:Date.now(),
            productid: product.id,
            product_name: product.product_name,
            farmername: userdata.Username,
            product_image: product.image || 'default-image.png'
        });

        console.log('Order added successfully');
    };

    const handleQuantityChange = (productId, value) => {
        setQuantity(prevState => ({
            ...prevState,
            [productId]: value
        }));
    };

    return ( 
        <div> 
            {allproducts.map(product => (
                <div key={product.id} style={productCardStyle}>
                    <div>
                        <img src={product.image || 'default-image.png'} alt={product.product_name} style={productImageStyle} />
                    </div>
                    <div>
                        <h2>{product.product_name}</h2>
                        <p>{product.product_desc}</p>
                        <p><strong>Quantity Available:</strong> {product.quantity}</p>
                        <p><strong>Vendor:</strong> {getVendorName(product.vendorid)}</p>
                        <label>
                            Quantity to Order:
                            <input 
                                type="number" 
                                placeholder="Enter quantity" 
                                value={quantity[product.id] || ''} 
                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            />
                        </label>
                        <button onClick={() => addOrder(product)}>Add Order</button>
                    </div>
                </div>
            ))}
        </div> 
    ); 
}

const productCardStyle = {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
};

const productImageStyle = {
    width: '150px',
    height: '150px',
    marginRight: '16px',
    objectFit: 'cover',
};

export default PurchaseMaterial;
