import { ProfileRelationsBoxWrapper } from "../ProfileRelations";


 export default function BoxRelations(props) {
    return (
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.list.length})
        </h2>

        <ul>
          {props.list.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={itemAtual.link} key={itemAtual.title} target="_blank">
                  <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    );
}