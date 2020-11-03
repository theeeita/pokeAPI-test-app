import Sidebar from "../sidebar";
import { addWrapperClass } from "../hoc";

const PagePokemonList = addWrapperClass(addWrapperClass(Sidebar,"container"), "main-content")


export default PagePokemonList;