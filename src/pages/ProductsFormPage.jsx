import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import uploadIcon from "../assets/addphoto.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoBagAdd } from "react-icons/io5";
import Navbar from "../components/Navbar"; // Asegúrate de que esté importado correctamente

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
      price: 0.0,
      year: 2,
      image: uploadIcon,
    },
  });
  const {
    products,
    createProduct,
    getProduct,
    updateProduct,
    updateProductNoUpdateImage,
  } = useProducts();
  const [selectedImage, setSelectedImage] = useState(uploadIcon);
  const inputImage = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const [updateImage, setUpateImage] = useState(false);

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
    formData.append("image", data.image);

    try {
      if (params.id) {
        if (!updateImage) {
          const updateData = {
            name: data.name,
            price: data.price.toString(),
            year: data.year.toString(),
            image: data.image,
          };
          await updateProductNoUpdateImage(params.id, updateData);
        } else {
          await updateProduct(params.id, formData);
        }
      } else {
        await createProduct(formData);
      }
      navigate("/products");
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
    setUpateImage(true);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="lg:w-64 w-0 fixed top-0 left-0 h-full bg-zinc-700 text-white transition-width duration-300 z-20">
        <div className="flex flex-col p-4">
          <Navbar />
        </div>
      </div>

      {/* Contenido de la página */}
      <div className="ml-64 w-full p-10 bg-zinc-800 max-w-md rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl font-bold my-2">Productos</h1>
          <label htmlFor="name">Nombre</label>
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

          <label htmlFor="price">Precio</label>
          <input
            type="number"
            step="0.10"
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

          <label htmlFor="year">Año</label>
          <input
            type="number"
            max={new Date().getFullYear()}
            min="1900"
            step="1"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Año del producto"
            {...register("year", {
              required: "El año es requerido",
              min: { value: 1900, message: "El año mínimo es 1900" },
              max: {
                value: new Date().getFullYear(),
                message: `El año máximo es ${new Date().getFullYear()}`,
              },
              valueAsNumber: true,
            })}
          />
          {errors.year && (
            <div className="text-red-500">{errors.year.message}</div>
          )}

          <div className="py-2 my-2">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Imagen seleccionada"
                width={200}
                height={200}
                className="max-h-[200px] object-contain"
                onClick={handleImageClick}
              />
            )}
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

          <button
            className="bg-transparent hover:bg-zinc-500 text-zinc-500 font-semibold hover:text-white py-2 px-4 border-zinc-500 hover:border-transparent rounded"
            type="submit"
          >
            <IoBagAdd size={30} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductsFormPage;
