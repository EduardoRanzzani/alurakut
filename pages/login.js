import axios from 'axios';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useState } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = useState('');
  const [loginInvalido, setLoginInvalido] = useState(false);

  function obterToken() {
    const url = 'https://alurakut.vercel.app/api/login';
    const headers = {
      'Content-Type': 'application/json',
    };

    axios.post(url, { 'githubUser': githubUser }, { headers: headers })
      .then(async response => {
        const token = await response.data.token;
        nookies.set(null, 'USER_TOKEN', token, {
          path: '/',
          maxAge: 86400 * 7
        });
      });
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={(e) => {
            e.preventDefault();

            if (githubUser.length > 0) {
              obterToken();
              router.push('/');
            } else {
              setLoginInvalido(true);
            }
          }}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p><br />
            <p style={{ color: 'red' }}>{loginInvalido ? 'Campo Usuário obrigatório' : ''}</p>
            <input id="usuario"
              placeholder="Usuário"
              value={githubUser}
              onChange={(e) => setGithubUser(e.target.value)}
            />
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
                </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main >
  );
}