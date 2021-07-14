import { ProfileRelationsBoxWrapper } from "../ProfileRelations";


export default function BoxRelations(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.list.length})
      </h2>

      <ul>
        {console.log(props.list)}
        {/* {props.list.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.html_url} key={itemAtual.id} target="_blank">
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          );
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

