import { Link } from "react-router-dom"

export const CardList = () => {
  const urlImage = "https://i.ytimg.com/vi/6yz_wG9hw1I/maxresdefault.jpg";
  const temasTeoria = [
    {
      title: "useEffect",
      to: "/useEffect",
    },
    {
      title: "imagenes",
      to: `/imagenes?src=${urlImage}`,
    },
    {
      title: "rutas anidadas",
      to: "/rutasanidadas",
    },
    {
      title: "apis",
      to: "/apis",
    },
    {
      title: "formularios",
      to: "/formularios",
    }
  ]

  return (
    <div className="flex flex-col gap-4">
      {temasTeoria.map((item, index) => (
        <Link 
          to={item.to} 
          key={index} 
          className="group w-full bg-[#151515] p-5 rounded-xl border-3 border-[#333] flex justify-between items-center hover:border-[#e776f3] cursor-pointer"
        >
          <h3 className="font-medium text-lg">{item.title}</h3>
          <svg 
            className="group-hover:border-[#e776f3]" 
            xmlns="http://www.w3.org/2000/svg" 
            width={12} 
            height={24} 
            viewBox="0 0 12 24"
          >
            <path 
              fill="currentColor" 
              fillRule="evenodd" 
              d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"
            />
          </svg>
        </Link>
      ))}
    </div>
  )
}