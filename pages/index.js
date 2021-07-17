import axios from 'axios';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';
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
      <p style={{ textAlign: 'center' }} >
        <a className="boxLink" href={props.githubUser.html_url} target="_blank" style={{ fontSize: '12px' }}>
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

export default function Home(props) {
  const apiUrl = 'https://api.github.com/users/';
  const username = props.username;
  const tokenCMS = '4f1ae2ae001f9a10a1284cb1cef5b2';

  const [githubUser, setGithubUser] = useState(githubUserState);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [scraps, setScraps] = useState([]);

  useEffect(() => {
    const apiUrlRequest = `${apiUrl}${username}`;
    getUserData(apiUrlRequest, setGithubUser);
    getUserData(`${apiUrlRequest}/followers`, setFollowers);
    getUserData(`${apiUrlRequest}/following`, setFollowing);
    getCommunities();
  }, []);

  function getUserData(url, setter) {
    axios.get(url).then(response => {
      setter(response.data);
    }, console.error);
  }

  function getCommunities() {
    const url = 'https://graphql.datocms.com/';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokenCMS}`,
    };

    axios.post(url, {
      'query': `query {
        allCommunities {
          id
          title
          image
          creatorSlug,
          link
        }
      }`
    }, { headers: headers })
      .then(response => {
        const communities = response.data.data.allCommunities;
        setComunidades(communities);
      }, console.error);
  }

  function saveCommunity(comunidade) {
    const url = '/api/comunidades';
    const headers = {
      'Content-Type': 'application/json',
    };
    axios.post(url, comunidade, { headers: headers })
      .then(async response => {
        const dados = await response.data.record;
        const comunidadesAtualizadas = [...comunidades, dados];
        setComunidades(comunidadesAtualizadas);
      }, console.error);
  }

  function saveScrap(scrap) {
    const url = '/api/scraps';
    const headers = {
      'Content-Type': 'application/json',
    };
    axios.post(url, scrap, { headers: headers })
      .then(async response => {
        const dados = await response.data.record;
        const arrayAtualizado = [...scraps, dados];
        setScraps(arrayAtualizado);
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
            <h2 className="subtitle">Nova Comunidade</h2>
            <form id='form-community' onSubmit={function handleSubmit(e) {
              e.preventDefault();

              const dadosForm = new FormData(e.target);

              const comunidade = {
                title: dadosForm.get('title'),
                image: dadosForm.get('image'),
                link: dadosForm.get('link'),
                creatorSlug: username
              };

              saveCommunity(comunidade);
              document.getElementById('form-community').reset();
            }}>
              <div>
                <input
                  placeholder="Informe um nome para a sua nova comunidade"
                  name="title"
                  aria-label="Informe um nome para a nova comunidade"
                  type="text"
                />
              </div>

              <div>
                <input
                  placeholder="Informe a url de uma imagem para a capa"
                  name="image"
                  aria-label="Informe a url de uma imagem para a capa"
                />
              </div>

              <div>
                <input
                  placeholder="Informe a url de acesso (externo)"
                  name="link"
                  aria-label="Informe a url de acesso (externo)"
                />
              </div>

              <button style={{ width: '30%' }}>
                Criar comunidade
              </button>
            </form>
          </Box>

          <Box>
            <h2 className="subtitle">Novo Scrap</h2>
            <form id='form-scrap' onSubmit={function handleSubmit(e) {
              e.preventDefault();

              const dadosForm = new FormData(e.target);
              const scrap = {
                name: dadosForm.get('nameScrap'),
                message: dadosForm.get('message'),
              };
              saveScrap(scrap);

              document.getElementById('form-scrap').reset();
            }}>

              <div>
                <input
                  placeholder="Informe seu nome"
                  aria-label="Informe seu nome"
                  name="nameScrap" />
              </div>
              <div>
                <input type="textarea"
                  placeholder="Digite seu recado"
                  aria-label="Digite seu recado"
                  name="message" />
              </div>

              <button style={{ width: '30%' }}>
                Enviar Recado
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permantent: false
      }
    };
  }

  const { isAuthenticated } = await axios.post('https://alurakut.vercel.app/api/auth', {}, {
    headers: {
      Authorization: token
    }
  }).then(res => {
    return res.data;
  });

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permantent: false,
      }
    };
  }

  const githubUser = jwt.decode(token).githubUser;
  return {
    props: {
      username: githubUser,
    }
  };
}