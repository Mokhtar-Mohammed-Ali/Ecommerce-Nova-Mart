
// import { IProduct } from "@/_components/interFaces/productsInterFace";
// import { ICategory } from "@/_components/interFaces/CategoriesInterface";

// import CategorySlider from "@/_components/components/Category/CategorySlider";
// import CardContainer from "@/_components/components/Card/CardContainer";

// export default async function Products() {
//   // products
//   const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
//     next: { revalidate: 6000 },
//   });
//   const { data: products }: { data: IProduct[] } = await response.json();

//   // categories
//   const CategoriesResponse = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/categories`,
//     { next: { revalidate: 100 * 60 } }
//   );
//   const { data: categories }: { data: ICategory[] } =
//     await CategoriesResponse.json();

//   return (
//     <>
//       <h1 className="text-4xl font-bold dark:text-amber-500 text-center p-8">
//         Our Products
//       </h1>

//       <div className="container mx-auto px-4 mb-8">
//         <CategorySlider categories={categories} />
//       </div>

//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-4">
//         {products.map((product) => (
//           <CardContainer product={product} key={product._id} />
//         ))}
//       </div>
//     </>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import CategorySlider from "@/_components/components/Category/CategorySlider";
// import CardContainer from "@/_components/components/Card/CardContainer";
// import { IProduct } from "@/_components/interFaces/productsInterFace";
// import { ICategory } from "@/_components/interFaces/CategoriesInterface";

// export default function ProductsPage() {
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [categories, setCategories] = useState<ICategory[]>([]);
//   const [brands, setBrands] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // filters
//   const [keyword, setKeyword] = useState("");
//   const [minPrice, setMinPrice] = useState<number | undefined>();
//   const [maxPrice, setMaxPrice] = useState<number | undefined>();
//   const [categoryId, setCategoryId] = useState<string>("");
//   const [brandId, setBrandId] = useState<string>("");
//   const [sort, setSort] = useState<string>("");

//   // Fetch Categories & Brands
//   useEffect(() => {
//     fetch("https://ecommerce.routemisr.com/api/v1/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data.data));

//     fetch("https://ecommerce.routemisr.com/api/v1/brands")
//       .then((res) => res.json())
//       .then((data) => setBrands(data.data));
//   }, []);

//   // Fetch Products with Filters
//   useEffect(() => {
//     const getProducts = async () => {
//       setLoading(true);
//       try {
//         let query = `?page=${page}&limit=8`;

//         if (keyword) query += `&keyword=${keyword}`;
//         if (minPrice) query += `&price[gte]=${minPrice}`;
//         if (maxPrice) query += `&price[lte]=${maxPrice}`;
//         if (categoryId) query += `&category[in]=${categoryId}`;
//         if (brandId) query += `&brand=${brandId}`;
//         if (sort) query += `&sort=${sort}`;

//         const res = await fetch(
//           `https://ecommerce.routemisr.com/api/v1/products${query}`
//         );
//         const data = await res.json();

//         setProducts(data.data);
//         setTotalPages(data.metadata?.numberOfPages || 1);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProducts();
//   }, [page, keyword, minPrice, maxPrice, categoryId, brandId, sort]);

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-4xl font-bold dark:text-amber-500 text-center mb-8">
//         Our Products
//       </h1>

//       {/* Categories Slider */}
//       <CategorySlider categories={categories} />

//       <div className="flex flex-col md:flex-row gap-8 mt-8">
//         {/* Sidebar Filters */}
//         <aside className="md:w-1/4 w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl shadow-md h-fit">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
//             Filters
//           </h2>

//           {/* Search */}
//           <input
//             type="text"
//             placeholder="Search..."
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//           />

//           {/* Price Filter */}
//           <div className="mb-4">
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Min Price
//             </label>
//             <input
//               type="number"
//               value={minPrice || ""}
//               onChange={(e) => setMinPrice(Number(e.target.value))}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Max Price
//             </label>
//             <input
//               type="number"
//               value={maxPrice || ""}
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           {/* Category Filter */}
//           <div className="mb-4">
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Category
//             </label>
//             <select
//               value={categoryId}
//               onChange={(e) => setCategoryId(e.target.value)}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">All</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Brand Filter */}
//           <div className="mb-4">
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Brand
//             </label>
//             <select
//               value={brandId}
//               onChange={(e) => setBrandId(e.target.value)}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">All</option>
//               {brands.map((brand) => (
//                 <option key={brand._id} value={brand._id}>
//                   {brand.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Sort Filter */}
//           <div>
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Sort by Price
//             </label>
//             <select
//               value={sort}
//               onChange={(e) => setSort(e.target.value)}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">Default</option>
//               <option value="price">Low to High</option>
//               <option value="-price">High to Low</option>
//             </select>
//           </div>
//         </aside>

//         {/* Products Grid */}
//         <main className="flex-1">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : products.length === 0 ? (
//             <p className="text-center text-gray-500">No products found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {products.map((product) => (
//                 <CardContainer key={product._id} product={product} />
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           <div className="flex justify-center mt-8 gap-2 flex-wrap">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-4 py-2 rounded-md border ${
//                   page === i + 1
//                     ? "bg-amber-500 text-white"
//                     : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
































// "use client";

// import { useEffect, useState } from "react";
// import { IProduct } from "@/_components/interFaces/productsInterFace";
// import { ICategory } from "@/_components/interFaces/CategoriesInterface";
// import CardContainer from "@/_components/components/Card/CardContainer";
// import { Filter, X } from "lucide-react";

// export default function ProductsPage() {
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [categories, setCategories] = useState<ICategory[]>([]);
//   const [brands, setBrands] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Filters
//   const [keyword, setKeyword] = useState("");
//   const [minPrice, setMinPrice] = useState<number | undefined>();
//   const [maxPrice, setMaxPrice] = useState<number | undefined>();
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [sort, setSort] = useState<string>("");

//   // Sidebar state for mobile
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Fetch categories & brands
//   useEffect(() => {
//     fetch("https://ecommerce.routemisr.com/api/v1/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data.data));

//     fetch("https://ecommerce.routemisr.com/api/v1/brands")
//       .then((res) => res.json())
//       .then((data) => setBrands(data.data));
//   }, []);

//   // Fetch products with filters
//   useEffect(() => {
//     const getProducts = async () => {
//       setLoading(true);
//       try {
//         let query = `?page=${page}&limit=8`;

//         if (keyword) query += `&keyword=${keyword}`;
//         if (minPrice) query += `&price[gte]=${minPrice}`;
//         if (maxPrice) query += `&price[lte]=${maxPrice}`;
//         if (selectedCategories.length > 0)
//           query += `&category[in]=${selectedCategories.join(",")}`;
//         if (selectedBrands.length > 0)
//           query += `&brand[in]=${selectedBrands.join(",")}`;
//         if (sort) query += `&sort=${sort}`;

//         const res = await fetch(
//           `https://ecommerce.routemisr.com/api/v1/products${query}`
//         );
//         const data = await res.json();

//         setProducts(data.data);
//         setTotalPages(data.metadata?.numberOfPages || 1);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProducts();
//   }, [page, keyword, minPrice, maxPrice, selectedCategories, selectedBrands, sort]);

//   // Handle checkboxes
//   const handleCategoryChange = (id: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
//     );
//   };

//   const handleBrandChange = (id: string) => {
//     setSelectedBrands((prev) =>
//       prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl md:text-4xl font-bold text-center mx-auto dark:text-amber-500">
//           Our Products
//         </h1>

//         {/* Mobile Filter Button */}
//         <button
//           onClick={() => setIsSidebarOpen(true)}
//           className="md:hidden p-2 bg-amber-500 text-white rounded-lg shadow-lg"
//         >
//           <Filter className="w-6 h-6" />
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Sidebar */}
//         <aside
//           className={`fixed md:static top-0 left-0 h-full md:h-fit w-3/4 sm:w-1/2 md:w-1/4 bg-gray-100 dark:bg-gray-800 p-6 rounded-none md:rounded-2xl shadow-lg transform transition-transform duration-300 z-50 
//             ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//         >
//           {/* Close button for mobile */}
//           <div className="flex justify-between items-center mb-4 md:hidden">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
//               Filters
//             </h2>
//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               className="text-gray-600 dark:text-gray-300"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Search */}
//           <input
//             type="text"
//             placeholder="Search..."
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//           />

//           {/* Price Filter */}
//           <div className="mb-4">
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Min Price
//             </label>
//             <input
//               type="number"
//               value={minPrice || ""}
//               onChange={(e) => setMinPrice(Number(e.target.value))}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Max Price
//             </label>
//             <input
//               type="number"
//               value={maxPrice || ""}
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           {/* Categories */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Categories
//             </h3>
//             <div className="max-h-40 overflow-y-auto space-y-1">
//               {categories.map((cat) => (
//                 <label key={cat._id} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={selectedCategories.includes(cat._id)}
//                     onChange={() => handleCategoryChange(cat._id)}
//                     className="accent-amber-500"
//                   />
//                   <span className="dark:text-gray-200 text-gray-700">
//                     {cat.name}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Brands */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Brands
//             </h3>
//             <div className="max-h-40 overflow-y-auto space-y-1">
//               {brands.map((brand) => (
//                 <label key={brand._id} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={selectedBrands.includes(brand._id)}
//                     onChange={() => handleBrandChange(brand._id)}
//                     className="accent-amber-500"
//                   />
//                   <span className="dark:text-gray-200 text-gray-700">
//                     {brand.name}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Sort */}
//           <div className="mb-2">
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Sort by Price
//             </label>
//             <select
//               value={sort}
//               onChange={(e) => setSort(e.target.value)}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">Default</option>
//               <option value="price">Low to High</option>
//               <option value="-price">High to Low</option>
//             </select>
//           </div>
//         </aside>

//         {/* Overlay when sidebar open on mobile */}
//         {isSidebarOpen && (
//           <div
//             onClick={() => setIsSidebarOpen(false)}
//             className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
//           />
//         )}

//         {/* Products Grid */}
//         <main className="flex-1">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : products.length === 0 ? (
//             <p className="text-center text-gray-500">No products found.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {products.map((product) => (
//                   <CardContainer key={product._id} product={product} />
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center mt-8 gap-2 flex-wrap">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i + 1}
//                     onClick={() => setPage(i + 1)}
//                     className={`px-4 py-2 rounded-md border transition ${
//                       page === i + 1
//                         ? "bg-amber-500 text-white"
//                         : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-600"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }















// "use client";

// import { useEffect, useState } from "react";
// import { IProduct } from "@/_components/interFaces/productsInterFace";
// import { ICategory } from "@/_components/interFaces/CategoriesInterface";
// import CardContainer from "@/_components/components/Card/CardContainer";
// import { Filter, X } from "lucide-react";

// export default function ProductsPage() {
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [categories, setCategories] = useState<ICategory[]>([]);
//   const [brands, setBrands] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   // Filters
//   const [keyword, setKeyword] = useState("");
//   const [minPrice, setMinPrice] = useState<number | undefined>();
//   const [maxPrice, setMaxPrice] = useState<number | undefined>();
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [sort, setSort] = useState<string>("");

//   // Sidebar state for mobile
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Fetch categories & brands
//   useEffect(() => {
//     fetch("https://ecommerce.routemisr.com/api/v1/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data.data));

//     fetch("https://ecommerce.routemisr.com/api/v1/brands")
//       .then((res) => res.json())
//       .then((data) => setBrands(data.data));
//   }, []);

//   // Fetch all products for front-end search & filtering
//   useEffect(() => {
//     const getAllProducts = async () => {
//       setLoading(true);
//       try {
//         const resTotal = await fetch(
//           "https://ecommerce.routemisr.com/api/v1/products?limit=1"
//         );
//         const dataTotal = await resTotal.json();
//         const totalProducts = dataTotal.results;

//         const resAll = await fetch(
//           `https://ecommerce.routemisr.com/api/v1/products?limit=${totalProducts}`
//         );
//         const dataAll = await resAll.json();

//         setProducts(dataAll.data || []);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getAllProducts();
//   }, []);

//   // Front-end filtered products
//   const filteredProducts = products.filter((product) => {
//     let matches = true;

//     // Keyword search
//     if (keyword) {
//       matches =
//         matches &&
//         product.title.toLowerCase().includes(keyword.toLowerCase());
//     }

//     // Price filters
//     if (minPrice !== undefined) matches = matches && product.price >= minPrice;
//     if (maxPrice !== undefined) matches = matches && product.price <= maxPrice;

//     // Category filter
//     if (selectedCategories.length > 0) {
//       matches =
//         matches &&
//         (selectedCategories.includes(product.category?._id || "") ||
//           product.subcategory?.some((sub) =>
//             selectedCategories.includes(sub._id)
//           ));
//     }

//     // Brand filter
//     if (selectedBrands.length > 0) {
//       matches = matches && selectedBrands.includes(product.brand?._id || "");
//     }

//     return matches;
//   });

//   // Pagination logic
//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const paginatedProducts = filteredProducts.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   // Handle checkboxes
//   const handleCategoryChange = (id: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
//     );
//     setPage(1);
//   };

//   const handleBrandChange = (id: string) => {
//     setSelectedBrands((prev) =>
//       prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
//     );
//     setPage(1);
//   };

//   // Reset all filters
//   const resetFilters = () => {
//     setKeyword("");
//     setMinPrice(undefined);
//     setMaxPrice(undefined);
//     setSelectedCategories([]);
//     setSelectedBrands([]);
//     setSort("");
//     setPage(1);
//     setIsSidebarOpen(false); // اغلق sidebar مباشرة بعد الريسيت
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl md:text-4xl font-bold text-center mx-auto dark:text-amber-500">
//           Our Products
//         </h1>

//         {/* Mobile Filter Button */}
//         <button
//           onClick={() => setIsSidebarOpen(true)}
//           className="md:hidden p-2 bg-amber-500 text-white rounded-lg shadow-lg"
//         >
//           <Filter className="w-6 h-6" />
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Sidebar */}
//         <aside
//           className={`fixed md:static top-0 left-0 h-full md:h-fit w-3/4 sm:w-1/2 md:w-1/4 bg-gray-100 dark:bg-gray-800 p-6 rounded-none md:rounded-2xl shadow-lg transform transition-transform duration-300 z-50 
//             ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//         >
//           {/* Close button for mobile */}
//           <div className="flex justify-between items-center mb-4 md:hidden">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
//               Filters
//             </h2>
//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               className="text-gray-600 dark:text-gray-300"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Search */}
//           <input
//             type="text"
//             placeholder="Search..."
//             value={keyword}
//             onChange={(e) => {
//               setKeyword(e.target.value);
//               setPage(1);
//             }}
//             className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//           />

//           {/* Price Filter */}
//           <div className="mb-4">
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Min Price
//             </label>
//             <input
//               type="number"
//               value={minPrice || ""}
//               onChange={(e) => setMinPrice(Number(e.target.value))}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Max Price
//             </label>
//             <input
//               type="number"
//               value={maxPrice || ""}
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           {/* Categories */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Categories
//             </h3>
//             <div className="max-h-40 overflow-y-auto space-y-1">
//               {categories.map((cat) => (
//                 <label key={cat._id} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={selectedCategories.includes(cat._id)}
//                     onChange={() => handleCategoryChange(cat._id)}
//                     className="accent-amber-500"
//                   />
//                   <span className="dark:text-gray-200 text-gray-700">
//                     {cat.name}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Brands */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Brands
//             </h3>
//             <div className="max-h-40 overflow-y-auto space-y-1">
//               {brands.map((brand) => (
//                 <label key={brand._id} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={selectedBrands.includes(brand._id)}
//                     onChange={() => handleBrandChange(brand._id)}
//                     className="accent-amber-500"
//                   />
//                   <span className="dark:text-gray-200 text-gray-700">
//                     {brand.name}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Sort */}
//           <div className="mb-2">
//             <label className="block mb-1 text-gray-700 dark:text-gray-300">
//               Sort by Price
//             </label>
//             <select
//               value={sort}
//               onChange={(e) => setSort(e.target.value)}
//               className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">Default</option>
//               <option value="price">Low to High</option>
//               <option value="-price">High to Low</option>
//             </select>
//           </div>

//           {/* Reset Filters Button */}
//           <button
//             onClick={resetFilters}
//             className="w-full py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//           >
//             Reset Filters
//           </button>
//         </aside>

//         {/* Overlay when sidebar open on mobile */}
//         {isSidebarOpen && (
//           <div
//             onClick={() => setIsSidebarOpen(false)}
//             className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
//           />
//         )}

//         {/* Products Grid */}
//         <main className="flex-1">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : paginatedProducts.length === 0 ? (
//             <p className="text-center text-gray-500">No products found.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {paginatedProducts.map((product) => (
//                   <CardContainer key={product._id} product={product} />
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center mt-8 gap-2 flex-wrap">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i + 1}
//                     onClick={() => setPage(i + 1)}
//                     className={`px-4 py-2 rounded-md border transition ${
//                       page === i + 1
//                         ? "bg-amber-500 text-white"
//                         : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-600"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }





import ProductsClient from "./_ProductDisplay/ProductsClient";
import { IProduct } from "@/_components/interFaces/productsInterFace";

async function fetchProducts() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products?limit=1000",
    { next: { revalidate: 60 } } // cache 60 ثانية
  );
  const data = await res.json();
  return data.data as IProduct[];
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return <ProductsClient initialProducts={products} />;
}
