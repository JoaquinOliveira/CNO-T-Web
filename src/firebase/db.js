
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase-config'
// Configuración de Firebase



// Función para crear un nuevo usuario en Firestore
const createUserInFirestore = async (userId, userData) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, userData);
        console.log('Usuario creado en Firestore');
    } catch (error) {
        console.error('Error al crear usuario en Firestore:', error);
        throw error;
    }
};

// Función para obtener un usuario de Firestore por su ID
const getUserById = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            console.log('Datos del usuario:', userData);
            return userData;
        } else {
            console.log('Usuario no encontrado');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
    }
};

// Función para actualizar un usuario en Firestore
const updateUserInFirestore = async (userId, updatedData) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, updatedData);
        console.log('Nuevos datos del usuario:', updatedData);
        console.log('Usuario actualizado en Firestore');
    } catch (error) {
        console.error('Error al actualizar usuario en Firestore:', error);
        throw error;
    }
};

// Función para eliminar un usuario de Firestore
const deleteUserFromFirestore = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        await deleteDoc(userRef);
        console.log('Usuario eliminado de Firestore');
    } catch (error) {
        console.error('Error al eliminar usuario de Firestore:', error);
        throw error;
    }
};

// Exportar las funciones y la instancia de Firestore
export {
    createUserInFirestore,
    getUserById,
    updateUserInFirestore,
    deleteUserFromFirestore,
};