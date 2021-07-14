import axios from 'axios';
import { useEffect, useState } from 'react';
import Box from '../src/components/Box';
import BoxRelations from '../src/components/BoxRelations';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={props.githubUser.avatar_url}
        alt={props.githubUser.name}
        style={{ borderRadius: '8px' }} />

      <hr />

      <p>
        <a className="boxLink" href={props.githubUser.url} target="_blank">
          @{props.githubUser.login}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

const githubUserState = {
  id: 0,
  login: '',
  name: '',
  avatar_url: '',
  following_url: '',
  followers_url: '',
  html_url: ''
};

const communityState = {
  id: 1,
  title: 'Eu odeio acordar cedo',
  image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
  link: 'https://www.orkut.br.com/MainCommunity?cmm=10000'
};

export default function Home() {
  const apiUrl = 'https://api.github.com/users/';
  const username = 'eduardoranzzani';

  const [githubUser, setGithubUser] = useState(githubUserState);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [comunidades, setComunidades] = useState([communityState]);

  useEffect(() => {
    getUserData();
    getFollowers();
    getFollowing();
  }, []);

  function getUserData() {
    axios.get(`${apiUrl}${username}`).then(response => {
      setGithubUser(response.data);
    }, console.error);
  }

  function getFollowers() {
    const url = `${apiUrl}${username}/followers`;
    axios.get(url).then(response => {
      setFollowers(response.data);
    }, console.error);
  }

  function getFollowing() {
    const url = `${apiUrl}${username}/following`;
    axios.get(url).then(response => {
      setFollowing(response.data);
    }, console.error);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser.login} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
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
                link: dadosForm.get('link')
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

              <div>
                <input
                  placeholder="Coloque uma URL para acessar a comunidade"
                  name="link"
                  aria-label="Coloque uma URL para acessar a comunidade"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <BoxRelations title="Seguindo" list={following} community={false} />
          <BoxRelations title="Seguidores" list={followers} community={false} />
          <BoxRelations title="Comunidades" list={comunidades} community={true} />
        </div>
      </MainGrid>
    </>
  );
}
