import axios from 'axios';
import { useEffect, useState } from 'react';
import Box from '../src/components/Box';
import BoxRelations from '../src/components/BoxRelations';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`}
        alt={props.githubUser}
        style={{ borderRadius: '8px' }} />

      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`} target="_blank">
          @{props.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

const initialState = {
  id: 0,
  login: '',
  name: '',
  avatar_url: '',
  following_url: '',
  followers_url: '',
  html_url: ''
};


export default function Home() {
  const apiUrl = 'https://api.github.com/users/';
  const username = 'eduardoranzzani';
  const [githubUser, setGithubUser] = useState(initialState);
  const [pessoas, setPessoas] = useState([initialState]);
  const [comunidades, setComunidades] = useState([{
    id: 1,
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    link: 'https://www.orkut.br.com/MainCommunity?cmm=10000'
  },
  {
    id: 2,
    title: 'Teste',
    image: 'https://picsum.photos/200?123',
    link: ''
  }]);

  // const pessoasFavoritas = [{
  //   id: 1,
  //   title: 'juunegreiros',
  //   image: 'https://github.com/juunegreiros.png',
  //   link: '/users/juunegreiros'
  // }, {
  //   id: 2,
  //   title: 'omariosouto',
  //   image: 'https://github.com/omariosouto.png',
  //   link: '/users/omariosouto'
  // }, {
  //   id: 3,
  //   title: 'peas',
  //   image: 'https://github.com/peas.png',
  //   link: '/users/peas'
  // }, {
  //   id: 4,
  //   title: 'rafaballerini',
  //   image: 'https://github.com/rafaballerini.png',
  //   link: '/users/rafaballerini'
  // }, {
  //   id: 5,
  //   title: 'marcobrunodev',
  //   image: 'https://github.com/marcobrunodev.png',
  //   link: '/users/marcobrunodev'
  // }, {
  //   id: 6,
  //   title: 'felipefialho',
  //   image: 'https://github.com/felipefialho.png',
  //   link: '/users/felipefialho'
  // }
  // ];

  useEffect(() => {
    getUserData();
  }, []);

  function getUserData() {
    axios.get(`${apiUrl}${username}`).then(response => {
      setGithubUser(response.data);

      const followers_url = response.data.followers_url;
      getFollowers(followers_url);
    }, console.error);
  }

  function getFollowers(url) {
    axios.get(url).then(response => {
      setPessoas(response.data);
    }, console.error);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser.login} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser.login} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a), {githubUser.name}</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subtitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleSubmit(e) {
              e.preventDefault();

              const dadosForm = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosForm.get('title'),
                image: dadosForm.get('image'),
              };

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          {/* <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li key={pessoa}>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper> 
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a href={comunidade.link} key={comunidade.title} target="_blank">
                      <img src={comunidade.image} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper> */}

          <BoxRelations title="Pessoas da Comunidade" list={pessoas} />
          {/* <BoxRelations title="Comunidades" list={comunidades} /> */}

        </div>
      </MainGrid>
    </>
  );
}
