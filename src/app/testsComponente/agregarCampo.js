// Importa Firebase y configúralo si aún no lo hiciste
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

// Obtén una referencia a Firestore
import { db } from '../../app/firebase.js'

// Función para agregar el campo "contador" a todos los documentos
async function agregarCampoContador() {
  try {
    // Obtén todos los documentos de la colección "alienList"
    const alienListRef = collection(db, "alienList");
    const snapshot = await getDocs(alienListRef);

    // Itera sobre los documentos y agrega el campo "contador"
    snapshot.forEach(async (docSnapshot) => {
      const docRef = doc(db, "alienList", docSnapshot.id);
      await updateDoc(docRef, { contadorTorneoIntergalactico: 0 });
      console.log(`Campo "contador" agregado al documento: ${docSnapshot.id}`);
    });

    console.log("Campo 'contador' agregado a todos los documentos de alienList.");
  } catch (error) {
    console.error("Error al agregar el campo 'contador':", error);
  }
}

// Llama a la función
agregarCampoContador();
