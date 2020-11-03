import PokemonProfile from "../pokemon-profile";
import { addWrapperClass } from "../hoc";

const PageProfile = addWrapperClass(
    addWrapperClass(PokemonProfile, "container"),"main-content"
);

export default PageProfile;