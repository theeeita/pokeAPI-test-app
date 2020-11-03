import NotFound from "../not-found";
import { addWrapperClass } from "../hoc";

const NotFoundPage = addWrapperClass(addWrapperClass(NotFound, "container"), "main-content");

export default NotFoundPage;