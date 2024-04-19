import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from "../../config/FirebaseConfig";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import styles from "./style";
import { signOut } from "firebase/auth";
import {API_URL, deleteProduct, getAllProducts}  from "../../config/APIConfig";
import axios from "axios";


const Task = ({ navigation, route }) => {
    const [products, setProducts] = useState([]);

    const auth = FIREBASE_AUTH;

    function logout() {
        try {
            signOut(auth);
            navigation.navigate('Login');
        } catch (error) {
            alert("Erro ao sair: " + error.message);
        }
    }
    
    
    const deleteID = async (productId) => {
        try {
            await deleteProduct(productId);
            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response.data); 
            } catch (error) {
                console.error("Error fetching tasks: ", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={products}
                renderItem={({ item }) => (
                    <View style={styles.Tasks}>
                        <TouchableOpacity style={styles.deleteTask} onPress={() => deleteID(item.id)}>
                            <FontAwesome name="check" size={23} color={"#120A8F"} />
                        </TouchableOpacity>
                        <Text style={styles.DescriptionTask} onPress={() => {
                            navigation.navigate("Details", {
                                id: item.id,
                                name: item.name,
                                description: item.description,
                                price: item.price,
                                idUser: route.params.idUser
                            });
                        }}>
                            {item.id},
                            {item.name},
                            {item.price},
                            {item.description},
                            
                        </Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity style={styles.buttonNewTask} onPress={() => navigation.navigate("NewTask", {idUser: route.params.idUser})}>
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogOut} onPress={logout}>
                <Text style={styles.iconButtonLogOut}>
                    <MaterialCommunityIcons name="location-exit" size={23} color="#f92e6a"></MaterialCommunityIcons>
                </Text>

            </TouchableOpacity>
        </View>
    );
};

export default Task;
