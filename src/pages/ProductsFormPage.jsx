import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import uploadIcon from "../assets/addphoto.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoBagAdd } from "react-icons/io5";
import Navbar from "../components/Navbar";

function ProductsFormPage() {
  const server = import.meta.env.VITE_BASE_URL + "/img/";
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      year: 1,
      image: uploadIcon,
    },
  });
  const {
    createProduct,
    getProduct,
    updateProduct,
    updateProductNoUpdateImage,
  } = useProducts();
  const [selectedImage, setSelectedImage] = useState(uploadIcon);
  const inputImage = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const [updateImage, setUpdateImage] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("year", product.year);
        setValue("image", product.image);
        setSelectedImage(server + product.image);
      }
    }
    loadProduct();
  }, [params.id, getProduct, setValue, server]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("year", data.year);

    if (data.image && updateImage) {
      formData.append("image", data.image); // Añadimos la imagen solo si es nueva
    }

    try {
      if (params.id) {
        if (!updateImage) {
          // Si no estamos actualizando la imagen, solo actualizamos los datos
          const updateData = {
            name: data.name,
            price: data.price.toString(),
            year: data.year.toString(),
            image: data.image, // Dejamos la imagen antigua si no se subió una nueva
          };
          await updateProductNoUpdateImage(params.id, updateData);
        } else {
          // Si estamos actualizando la imagen, lo hacemos con el FormData
          await updateProduct(params.id, formData);
        }
      } else {
        // Si no hay `id`, estamos creando un nuevo producto
        await createProduct(formData);
      }
      navigate("/products"); // Redirige a la lista de productos
    } catch (error) {
      console.error("Error al procesar el producto:", error);
    }
  });

  const handleImageClick = () => {
    inputImage.current.click();
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    setSelectedImage(file ? URL.createObjectURL(file) : uploadIcon);
    field.onChange(file);
    setUpdateImage(true);
  };

  return (
    <div className="flex min-h-screen bg-[#210303]">
      {/* Sidebar */}
      <div className="lg:w-64 w-0 fixed top-0 left-0 h-full bg-zinc-700 text-white transition-width duration-300 z-20">
        <div className="flex flex-col p-4">
          <Navbar />
        </div>
      </div>

      {/* Contenido de la página */}
      <div className="ml-64 w-full p-10 bg-[#210303]">
        <div className="max-w-4xl mx-auto mt-10 bg-[#210303] p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-yellow-500 mb-6">
            {params.id ? "Actualizar Producto" : "Agregar Producto"}
          </h1>

          <form onSubmit={onSubmit}>
            {/* Nombre del producto */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-lg font-semibold text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Nombre del producto"
                {...register("name", { required: "El nombre es requerido" })}
                autoFocus
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>

            {/* Precio */}
            <div className="mb-6">
              <label
                htmlFor="price"
                className="text-lg font-semibold text-white"
              >
                Precio
              </label>
              <input
                type="number"
                step="10"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Precio del producto"
                {...register("price", {
                  required: "El precio es requerido",
                  min: { value: 0, message: "El precio mínimo es 0" },
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <div className="text-red-500">{errors.price.message}</div>
              )}
            </div>

            {/* Cantidad */}
            <div className="mb-6">
              <label
                htmlFor="year"
                className="text-lg font-semibold text-white"
              >
                Cantidad
              </label>
              <input
                type="number"
                max={new Date().getFullYear()}
                min="1"
                step="1"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Cantidad del producto"
                {...register("year", {
                  required: "La cantidad es requerida",
                  min: { value: 1, message: "La cantidad mínima es: 1" },
                  max: {
                    value: new Date().getFullYear(),
                    message: `La cantidad máxima es: ${new Date().getFullYear()}`,
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.year && (
                <div className="text-red-500">{errors.year.message}</div>
              )}
            </div>

            {/* Imagen */}
            <div className="mb-6">
              <label
                htmlFor="image"
                className="text-lg font-semibold text-white"
              >
                Imagen del producto
              </label>
              <div className="flex justify-center py-2 my-2">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Imagen seleccionada"
                    width={200}
                    height={200}
                    className="max-h-[200px] object-contain rounded-md border-2 border-yellow-500 cursor-pointer"
                    onClick={handleImageClick}
                  />
                )}
              </div>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    ref={inputImage}
                    onChange={(e) => handleImageChange(e, field)}
                    className="hidden"
                  />
                )}
              />
            </div>

            {/* Botón */}
            <button
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg mt-6 flex items-center justify-center"
              type="submit"
            >
              <IoBagAdd size={30} className="mr-2" />
              {params.id ? "Actualizar Producto" : "Agregar Producto"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductsFormPage;
