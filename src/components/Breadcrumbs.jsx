import { Link, useLocation } from "react-router-dom"

export default function Breadcrumbs() {
  const location = useLocation();
  let currentPath = '';
  const pathName = location.pathname.split("/").filter(path => path !== '').map((path, index, array) => {
    currentPath += `/${path}`;

    return (
      <div className="path" key={path}>
        
        <Link className="text-pink-300" to={currentPath}>
          {path}
        </Link>
         {index < array.length - 1 && <span className="mx-2"> &gt; </span>}
      </div>
    )

  });
  return (
    <div className="path font-black text-xl flex space-x-5">
      <Link to={'/'}>Home</Link>
      {pathName.length > 0 && <span className="mx-2"> &gt; </span>} {/* Separator after "Home" if there are paths */}
      {pathName}</div>
  )
}