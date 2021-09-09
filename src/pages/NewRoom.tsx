import { FormEvent, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { database } from '../services/firebase';

export function NewRoom()  {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        console.log(newRoom);

        if (newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorID: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`);

    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustrção simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real.</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        
                        <input 
                            type="text"
                            placeholder="Nome da sala" 
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />

                        <h1></h1>

                        <Button type="submit">
                            Entrar na sala
                        </Button>

                    </form>
                        <p>
                            Quer entrar em uma sala existente? 
                            <Link to="/">
                                Clique aqui!
                            </Link>    
                        </p>
                </div>
            </main>
        </div>
    )
}