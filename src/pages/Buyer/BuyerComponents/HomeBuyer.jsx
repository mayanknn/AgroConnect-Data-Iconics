import React, { useState, useEffect } from 'react'; 
import { collection, getDocs, getFirestore } from 'firebase/firestore'; 
import { app } from '../../../firebase'; 
 
 
const db = getFirestore(app); 
 
function HomeBuyer() { 
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
 
  useEffect(() => { 
    const fetchItems = async () => { 
      try { 
        const querySnapshot = await getDocs(collection(db, 'buyorder')); // Using 'buyorder' as the collection name 
        const itemList = querySnapshot.docs.map((doc) => ({ 
          id: doc.id, 
          ...doc.data(), 
        })); 
        setItems(itemList); 
      } catch (error) { 
        console.error('Error fetching items: ', error); 
      } finally { 
        setLoading(false); 
      } 
    }; 
 
    fetchItems(); 
  }, []); 
 
  if (loading) { 
    return <p>Loading...</p>; 
  } 
 
  return ( 
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}> 
      {items.map((item) => ( 
        <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', width: '200px' }}> 
          <img 
            src={item.imageUrl} 
            alt={item.productName} 
            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
          /> 
          <h3 style={{ margin: '10px 0' }}>{item.productName}</h3> 
          <p><strong>Category:</strong> {item.category}</p> 
          <p><strong>Farmer Name:</strong> {item.farmer_name}</p> 
          <p><strong>Price:</strong> {item.price}</p> 
          <p><strong>Quantity:</strong> {item.quantity}</p> 
          <p><strong>Status:</strong> {item.status}</p> 
        </div> 
      ))} 
    </div> 
  ); 
} 
 
export default HomeBuyer;