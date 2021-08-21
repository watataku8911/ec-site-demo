import { db, FirebaseTimestamp } from "../../firebase/index";
import { fetchProductsAction, deleteProductAction } from "./action";
import { push } from "connected-react-router";
import { hideLoadingAction, showLoadingAction } from "../loading/action";
//import {createPaymentIntent} from "../payments/operations";

const productsRef = db.collection("products");

export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    dispatch(showLoadingAction("決済処理中..."));
    const uid = getState().users.uid;
    const userRef = db.collection("users").doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products = [],
      soldOutProducts = [];

    const batch = db.batch();

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const sizes = snapshot.data().sizes;

      // Create a new array of the product sizes
      const updateSizes = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size;
          }
          return {
            size: size.size,
            quantity: size.quantity - 1,
          };
        } else {
          return size;
        }
      });

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      batch.update(productsRef.doc(product.productId), { sizes: updateSizes });

      batch.delete(userRef.collection("cart").doc(product.cartId));
    }

    if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join("と")
          : soldOutProducts[0];
      alert(
        "大変申し訳ありませんが、" +
          errorMessage +
          "は在庫切れとなっていますので注文処理を中断しました。"
      );
      return false;
    } else {
      batch
        .commit()
        .then(() => {
          // Create order history data
          const orderRef = userRef.collection("order").doc();
          const date = timestamp.toDate();

          // Calculate shipping date which is the date after 3 days
          const shippingDate = FirebaseTimestamp.fromDate(
            new Date(date.setDate(date.getDate() + 3))
          );

          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp,
          };

          orderRef.set(history);

          dispatch(hideLoadingAction());
          dispatch(push("/order/complete"));
        })
        .catch(() => {
          alert(
            "注文処理に失敗しました。通信環境をご確認の上再度お確かめ下さい。"
          );
          return false;
        });
    }
  };
};

export const fetchProducts = (gender, category) => {
  return async (dispatch) => {
    let query = productsRef.orderBy("updated_at", "desc");
    query = gender !== "" ? query.where("gender", "==", gender) : query;
    query = category !== "" ? query.where("category", "==", category) : query;
    query.get().then((snapshots) => {
      const productList = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        productList.push(product);
      });
      dispatch(fetchProductsAction(productList));
    });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id
        );
        dispatch(deleteProductAction(nextProducts));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const saveProduct = (
  id,
  name,
  description,
  category,
  gender,
  price,
  sizes,
  images
) => {
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
      updated_at: timestamp,
    };

    if (id === "") {
      const ref = productsRef.doc();
      data.created_at = timestamp;
      id = ref.id;
      data.id = id;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
