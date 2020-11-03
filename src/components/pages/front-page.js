import PokemonCardsList from "../pokemon-cards-list";
import { addWrapperClass } from "../hoc";

const FrontPage = addWrapperClass(PokemonCardsList, "main-content");

export default FrontPage;