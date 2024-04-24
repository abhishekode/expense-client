import { CreateCategoryRequest } from "Interfaces/auth.api";
import { ICategory } from "Interfaces/common";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryAPI } from "utils/api.method";

interface AdminCategoryProps {
  category?: ICategory; // If category is provided, it means we're updating
}

const AdminCategory: React.FC<AdminCategoryProps> = ({ category }) => {
  const [image, setImage] = React.useState('');
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateCategoryRequest>();

  React.useEffect(() => {
    // If category is provided, set the form values for updating
    if (category) {
      setValue("name", category.name);
    }
  }, [category, setValue]);

  const convert2ToBase64 = (file: Blob) =>{
    const reader = new FileReader();

    reader.onload = () =>{
      setImage(reader?.result?.toString || "")
    }

    reader.readAsDataURL(file)
  }

  const onSubmit = async (data: CreateCategoryRequest) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.categoryImage.arrayBuffer.length > 0) {
        
        formData.append("files", data.categoryImage);
      }

      if (category) {
        // If category is provided, it means we're updating
        await CategoryAPI.updateCategory(category._id, formData);
      } else {
        // If category is not provided, it means we're creating
        await CategoryAPI.createCategory(formData);
      }
      // Optionally, you can handle success or redirect after successful submission
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      // Handle error
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-5">{category ? 'Update Category' : 'Create Category'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto" encType="multipart/form-data">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="mt-1 p-2 block w-full rounded border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700">
            Category Image
          </label>
          <input
            type="file"
            id="categoryImage"
            {...register("categoryImage", { required: "Category image is required" })}
            className="mt-1 p-2 block w-full rounded border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.categoryImage && <p className="text-sm text-red-500 mt-1">{errors.categoryImage.message}</p>}
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border bg-indigo-600 rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-300 disabled:opacity-50"
        >
          {category ? 'Update Category' : 'Create Category'}
        </button>
      </form>
    </div>
  );
};

export default AdminCategory;
