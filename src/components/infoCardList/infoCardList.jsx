import "./infocardlist.css"

export default function InfoCardList({info}) {
  let listbody = info.values.map((item, i) => {
    return (
      <li key={i} value={item}>
        {item}
      </li>
    );
    });
  

  return (
    <div className="featuredItem">
      <span className="featuredTitle">{info.title}</span>
      <ul className="featuredList">
      {listbody}
      </ul>
    </div>
  )
}
