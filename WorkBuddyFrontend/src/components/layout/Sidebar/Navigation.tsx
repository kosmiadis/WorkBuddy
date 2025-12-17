
import paths from "../../../config/paths";
import NavigationLink from "../../ui/NavigationLink";
import { toCamelCase } from "../../../util/toCamelCase";
import { useLocation } from "react-router-dom";


export default function Navigation () {
    const appPaths = Object.entries(paths.app)
    const location = useLocation();

    return <nav className="flex flex-col gap-1">
        {appPaths.map((path, index) => 
           <NavigationLink key={path[1].getPath()+'_'+index} isActive={location.pathname == '/'+path[1].getPath()} to={path[1].getPath()}>{toCamelCase(path[1].getPath())}</NavigationLink>
        )}
    </nav>
}