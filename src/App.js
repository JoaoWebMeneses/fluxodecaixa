import { useEffect, useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBmd9zF2zbt25KXUPdajJ1EdkQ_iMerpHQ",
  authDomain: "fluxodecaixa-2dc6f.firebaseapp.com",
  projectId: "fluxodecaixa-2dc6f",
});

export const App = () => {
  const [saldo, setSaldo] = useState("");
  const [gastocom, setGastoCom] = useState("");
  const [valor, setValor] = useState("");
  const [caixas, setCaixas] = useState([]);
  const [lucro, setLucro] = useState(0);

  const db = getFirestore(firebaseApp);
  const caixaCollectionRef = collection(db, "caixa");

  async function criarCaixa() {
    const caixa = await addDoc(caixaCollectionRef, {
      saldo,
      gastocom,
      valor
    });

    setCaixas(prevCaixas => [...prevCaixas, { id: caixa.id, saldo, gastocom, valor }]);
  }

  useEffect(() => {
    const getCaixa = async () => {
      const data = await getDocs(caixaCollectionRef);
      setCaixas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getCaixa();
  }, [caixaCollectionRef])

  // Atualiza o lucro sempre que as entradas ou saídas mudam
  useEffect(() => {
    const entradas = caixas.reduce((total, caixa) => {
      if (caixa.saldo === "Positivo") {
        return total + parseFloat(caixa.valor);
      }
      return total;
    }, 0);

    const saidas = caixas.reduce((total, caixa) => {
      if (caixa.saldo === "Negativo") {
        return total + parseFloat(caixa.valor);
      }
      return total;
    }, 0);

    setLucro(entradas - saidas);
  }, [caixas]);

  return (
    <div>
      <div className='fluxodecaixa'>
        <h1>FLUXO DE CAIXA</h1>
      </div>
      <div className='inputs'>
        <input type="number" placeholder='Valor' value={valor} onChange={(e) => setValor(e.target.value)}></input>
        <br></br>
        <br></br>
        <input type='text' placeholder='Gasto/Ganho com' value={gastocom} onChange={(e) => setGastoCom(e.target.value)}></input>
        <br></br>
        <br></br>
        <select id="seletor" value={saldo} onChange={(e) => setSaldo(e.target.value)}>
          <option value="">Selecione uma opção</option>
          <option value="Positivo">Entrada</option>
          <option value="Negativo">Saída</option>
        </select>
        <br></br>
        <br></br>
        <button onClick={criarCaixa} id="enviar">Enviar</button>
      </div>
      <div className='tabela'>
      <div className='saida' id='saida'>
        <h1>SAÍDA</h1>
        <ul>
          {caixas.map(caixa => {
            if (caixa.saldo === "Negativo"){
              return(
                <div>
                  <li>{caixa.gastocom}</li>
                  <li>R$ {caixa.valor}</li>
                  <br></br>
                  <br></br>
                </div>
              )
            }
          })}
        </ul>
        </div>
        <div className='entrada' id='entrada'>
          <h1>ENTRADA</h1>
          <ul>
              {caixas.map(caixa => {
                if (caixa.saldo === "Positivo"){
                  return(
                    <div>
                      <li>{caixa.gastocom}</li>
                      <li>R$ {caixa.valor}</li>
                      <br></br>
                      <br></br>
                    </div>
                  )
                }
              })}
          </ul>
        </div>
          <div className='lucro'>
            <h1>LUCRO</h1>
            <p>R$ {lucro}</p>
          </div>
      </div>
    </div>
  );
}