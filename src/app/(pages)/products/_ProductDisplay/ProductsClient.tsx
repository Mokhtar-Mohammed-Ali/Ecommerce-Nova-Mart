
"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/_components/interFaces/productsInterFace";
import { ICategory } from "@/_components/interFaces/CategoriesInterface";
import CardContainer from "@/_components/components/Card/CardContainer";
import { Filter, X } from "lucide-react";

interface Props {
  initialProducts: IProduct[];
}

export default function ProductsClient({ initialProducts }: Props) {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch categories & brands on mount
  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.data));

    fetch("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.data));
  }, []);

  // Filter products client-side
  const filterProducts = () => {
    setLoading(true);

    let filtered = initialProducts;

    // keyword search
    if (keyword) {
      const kw = keyword.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(kw));
    }

    // price filter
    if (minPrice !== undefined) filtered = filtered.filter((p) => p.price >= minPrice);
    if (maxPrice !== undefined) filtered = filtered.filter((p) => p.price <= maxPrice);

    // categories
    if (selectedCategories.length > 0)
      filtered = filtered.filter((p) => selectedCategories.includes(p.category._id));

    // brands
    if (selectedBrands.length > 0)
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand._id));

    // sort
    if (sort === "price") filtered = filtered.sort((a, b) => a.price - b.price);
    if (sort === "-price") filtered = filtered.sort((a, b) => b.price - a.price);

    setProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / 8));
    setPage(1); // reset page
    setLoading(false);
  };

  // Apply filter whenever inputs change
  useEffect(() => {
    filterProducts();
  }, [keyword, minPrice, maxPrice, selectedCategories, selectedBrands, sort]);

  const handleCategoryChange = (id: string) =>
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  const handleBrandChange = (id: string) =>
    setSelectedBrands((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));

  const resetFilters = () => {
    setKeyword("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSort("");
    setProducts(initialProducts);
    setPage(1);
    setIsSidebarOpen(false);
  };

  // Pagination logic
  const start = (page - 1) * 8;
  const end = start + 8;
  const paginatedProducts = products.slice(start, end);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mx-auto dark:text-amber-500">
          Our Products
        </h1>
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 bg-amber-500 text-white rounded-lg shadow-lg">
          <Filter className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-full md:h-fit w-3/4 sm:w-1/2 md:w-1/4 bg-gray-100 dark:bg-gray-800 p-6 rounded-none md:rounded-2xl shadow-lg transform transition-transform duration-300 z-50 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          {/* Close button */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Filters</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-600 dark:text-gray-300">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />

          {/* Price Filter */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Min Price</label>
            <input
              type="number"
              value={minPrice || ""}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Max Price</label>
            <input
              type="number"
              value={maxPrice || ""}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Categories */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Categories</h3>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {categories.map((cat) => (
                <label key={cat._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat._id)}
                    onChange={() => handleCategoryChange(cat._id)}
                    className="accent-amber-500"
                  />
                  <span className="dark:text-gray-200 text-gray-700">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Brands</h3>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {brands.map((brand) => (
                <label key={brand._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand._id)}
                    onChange={() => handleBrandChange(brand._id)}
                    className="accent-amber-500"
                  />
                  <span className="dark:text-gray-200 text-gray-700">{brand.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Sort by Price</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="">Default</option>
              <option value="price">Low to High</option>
              <option value="-price">High to Low</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Reset Filters
          </button>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40" />}

        {/* Products Grid */}
        <main className="flex-1">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : paginatedProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <CardContainer key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8 gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded-md border transition ${
                      page === i + 1
                        ? "bg-amber-500 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
