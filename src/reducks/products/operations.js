import {db, FirebaseTimestamp} from '../../firebase/index';
import {fetchProductsAction} from "./action";
import {push} from 'connected-react-router';

const productsRef = db.collection('products');

export const fetchProducts = () => {  //引数：gender, categoryをいれる
    return async (dispatch) => {
        //let query = productsRef.orderBy('updated_at', 'desc');
        // query = (gender !== "") ? query.where('gender', '==', gender) : query;
        // query = (category !== "") ? query.where('category', '==', category) : query;

        productsRef.get()
            .then(snapshots => {
            const productList = [];
            snapshots.forEach(snapshot => {
                const product = snapshot.data();
                productList.push(product);
            })
            dispatch(fetchProductsAction(productList));
        })
    }
}

export const saveProduct = (id, name, description, category, gender, price, sizes, images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();

        const data = {
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            price: parseInt(price, 10),
            sizes: sizes,
            updated_at: timestamp
        }

        if(id === "") {
            const ref = productsRef.doc()
            data.created_at = timestamp;
            id = ref.id;
            data.id = id;
        } 
        

        return productsRef.doc(id).set(data, {merge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
};