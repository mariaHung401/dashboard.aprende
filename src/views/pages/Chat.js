import React, { useRef, useState } from 'react';
import './Chat.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {Link} from 'react-router-dom';

firebase.initializeApp({
    apiKey: "AIzaSyBoOsm-fVCE3CaINek5LurcRwIBOqu2-fs",
    authDomain: "chatapp-d098c.firebaseapp.com",
    projectId: "chatapp-d098c",
    storageBucket: "chatapp-d098c.appspot.com",
    messagingSenderId: "11098059960",
    appId: "1:11098059960:web:1969239b37a32639cb304d",
    measurementId: "G-V92L3S4D0N"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function App() {

const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header>
                <div className="logo">
                    <h4>Mensajes</h4>
                </div>
                <div className="header-right">
                    <button type="button" class="btn btn-light">
                        <Link to="admin/dashboard">Volver</Link>
                    </button>
                    <SignOut />
                </div>
            </header>

            <section>
                {user ? <ChatRoom /> : <SignIn />}
            </section>

        </div>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
        <div>
            <button type="button" class="btn btn-light" onClick={signInWithGoogle}>Entra con Google</button>

        </div>
        </>
    )

}

function SignOut() {
    return auth.currentUser && (
        <button type="button" class="btn btn-light" onClick={() => auth.signOut()}>Cerrar sesión</button>
    )
}


function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(100);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (<>
        <main>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            <span ref={dummy}></span>
        </main>

        <form className="form__send" onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Escribe aqui" />
            <button type="submit" disabled={!formValue}>🕊enviar</button>
        </form>
    </>)
}

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
    <>
        <div className={`message ${messageClass}`}>
            <img className="img__mail" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p className="text__message">{text}</p>
        </div>
    </>
    )
}


export default App;