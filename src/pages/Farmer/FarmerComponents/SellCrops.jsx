    import React, { useState } from 'react';
    import { collection, doc, setDoc, getFirestore, query, where, getDocs } from 'firebase/firestore';
    import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
    import { app } from '../../../firebase';

    const db = getFirestore(app);
    const storage = getStorage(app);

    function SellCrops() {
        const [productName, setProductName] = useState('');
        const [quantity, setQuantity] = useState('');
        const [price, setPrice] = useState('');
        const [status, setStatus] = useState('Available');
        const [category, setCategory] = useState('Rice');
        const [image, setImage] = useState(null);
        const [uploading, setUploading] = useState(false);
        const [uploadProgress, setUploadProgress] = useState(0);
        const [error, setError] = useState('');

        const handleImageChange = (e) => {
            setImage(e.target.files[0]);
        };

        const checkInventory = async (productName, quantity) => {
            try {
                const invRef = collection(db, 'inventory');
                const q = query(invRef, where('product_name', '==', productName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const inventoryDoc = querySnapshot.docs[0].data();
                    return inventoryDoc.quantity >= quantity;
                } else {
                    console.error('Inventory document not found');
                    return false;
                }
            } catch (error) {
                console.error('Error checking inventory:', error);
                return false;
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setUploading(true);
            setError('');
        
            try {
                // Check if quantity is greater than zero
                if (parseInt(quantity, 10) <= 0) {
                    setError('Quantity must be greater than zero.');
                    setUploading(false);
                    return;
                }
        
                // Check inventory availability
                const isAvailable = await checkInventory(productName, parseInt(quantity, 10));
                if (!isAvailable) {
                    setError('Insufficient inventory for the requested quantity.');
                    setUploading(false);
                    return;
                }
        
                let imageUrl = '';
                if (image) {
                    const imageRef = ref(storage, `images/${image.name}`);
                    const uploadTask = uploadBytesResumable(imageRef, image);
        
                    // Wait for the image upload to complete
                    await new Promise((resolve, reject) => {
                        uploadTask.on('state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                setUploadProgress(progress);
                            },
                            (error) => {
                                console.error("Error uploading image: ", error);
                                reject(error);
                            },
                            async () => {
                                imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                                resolve();
                            }
                        );
                    });
                }
                function randomAlphaNumeric(length) {
                    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let result = '';
                    for (let i = 0; i < length; i++) {
                    result += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    return result;
                } 
                // Proceed to set document only if all checks are successful
                const id = randomAlphaNumeric(10);
                const cropsCollectionRef = collection(db, 'buyorder');
                const buyorderDoc = doc(cropsCollectionRef, id);
                const localuser = localStorage.getItem('userData');
                const userData = JSON.parse(localuser);
                await setDoc(buyorderDoc, {
                    productName,
                    quantity,
                    price,
                    status,
                    category,
                    imageUrl,
                    buyid:id,
                    farmer_id:userData.uid,
                    farmer_name:userData.Username,

                });
        
                alert('Data submitted successfully!');
                // Reset form
                setProductName('');
                setQuantity('');
                setPrice('');
                setStatus('Available');
                setCategory('Rice');
                setImage(null);
                setUploadProgress(0);
            } catch (error) {
                console.error("Error submitting data: ", error);
                setError('Error submitting data. Please try again.');
            } finally {
                setUploading(false);
            }
        };
        

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="product_name">Product Name: </label></td>
                                <td>
                                    <input
                                        id="product_name"
                                        type="text"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="quantity">Quantity: </label></td>
                                <td>
                                    <input
                                        id="quantity"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="price">Price: </label></td>
                                <td>
                                    <input
                                        id="price"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="status">Status: </label></td>
                                <td>
                                    <select
                                        id="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        required
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="category">Category: </label></td>
                                <td>
                                    <select
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="Rice">Rice</option>
                                        <option value="Wheat">Wheat</option>
                                        <option value="Cotton">Cotton</option>
                                        <option value="Mazze">Mazze</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="image">Image of the Seed: </label></td>
                                <td>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" disabled={uploading}>
                        {uploading ? `Uploading... ${uploadProgress.toFixed(2)}%` : 'Submit'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        );
    }

    export default SellCrops;
