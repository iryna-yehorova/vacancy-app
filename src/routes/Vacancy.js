import { useParams } from "react-router-dom";

export default function Vacancy() {
  let params = useParams();
    

  return <h2>Vacancy: { params.slug }</h2>;
}