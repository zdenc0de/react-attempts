export const Cardproducto = ({ producto }) => {
  return (
    <div className="p-4 border rounded-2xl shadow-2xl">
      <h3 className="text-fl font-bold">{producto.nombre}
      </h3>
      <p className="text-gray-600">{producto.precio}</p>
      {producto.destacado && <span className="text-yellow-600 font semi-bold">Destacado</span>}
    </div>
  );
};
