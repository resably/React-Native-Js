import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/axiosConfig";

//fetchProducts
export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = await AsyncStorage.getItem("accessToken");
            if (!accessToken) throw new Error("Token bulunamadı");

            const response = await api.get("/products", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data.products;
        } catch (error) {
            console.log("fetchProducts error", error);
            return rejectWithValue(error.response.data.error);
        }
    }
);

//fetchProductById
export const fetchProductById = createAsyncThunk(
    "product/fetchProductById",
    async (productId, { rejectWithValue }) => {
        try {
            const accessToken = await AsyncStorage.getItem("accessToken");
            if (!accessToken) throw new Error("Token bulunamadı");

            const response = await api.get(`/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data.product;
        } catch (error) {
            console.log("fetchProductById error", error);
            return rejectWithValue(error.response.data.error);
        }
    }
);

//addProduct
export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const accessToken = await AsyncStorage.getItem("accessToken");
            if (!accessToken) throw new Error("Token bulunamadı");

            const response = await api.post("/products", productData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data.data;
        } catch (error) {
            console.log("addProduct error", error);
            return rejectWithValue(error.response.data.error);
        }
    }
);

//updateProduct
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ productId, productData }, { rejectWithValue }) => {
        try {
            const accessToken = await AsyncStorage.getItem("accessToken");
            if (!accessToken) throw new Error("Token bulunamadı");

            const response = await api.put(`/products/${productId}`, productData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data.product;
        } catch (error) {
            console.log("updateProduct error", error);
            return rejectWithValue(error.response.data.error);
        }
    }
);

//deleteProduct
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const accessToken = await AsyncStorage.getItem("accessToken");
            if (!accessToken) throw new Error("Token bulunamadı");

            const response = await api.delete(`/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return { id: productId };
        } catch (error) {
            console.log("deleteProduct error", error);
            return rejectWithValue(error.response.data.error);
        }
    }
);

const initialState = {
    products: [],
    selectedProduct: [],
    isLoading: false,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.selectedProduct = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter(
                    (product) => product.id !== action.payload.id
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { } = productSlice.actions;
export default productSlice.reducer;