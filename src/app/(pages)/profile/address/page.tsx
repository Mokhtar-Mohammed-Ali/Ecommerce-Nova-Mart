
"use client";

import { useEffect, useState, useRef } from "react";
import { UserAddress } from "@/_components/interFaces/AdressesInterFace";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { addAdress, removeAdress } from "@/_components/components/_actions/CartAndProduct";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const detailsRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);

  async function fetchAddresses() {
    try {
      setLoading(true);
      const res = await fetch(`/api/addresse`);
      const data = await res.json();
      setAddresses(data.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  const validate = (name: string, details: string, phone: string, city: string) => {
    if (name.length < 2) return "Name too short";
    if (city.length < 2) return "City too short";
    if (details.length < 3) return "Details too short";
    if (!/^\+?[0-9\s\-()]{7,20}$/.test(phone)) return "Invalid phone number";
    return null;
  };

  const handleAddAddress = async () => {
    const name = nameRef.current?.value.trim() ?? "";
    const details = detailsRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";
    const city = cityRef.current?.value.trim() ?? "";

    const validationError = validate(name, details, phone, city);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    const data = await addAdress(name, details, phone, city);

    if (data.status === "success") {
      await fetchAddresses();

      if (nameRef.current) nameRef.current.value = "";
      if (detailsRef.current) detailsRef.current.value = "";
      if (phoneRef.current) phoneRef.current.value = "";
      if (cityRef.current) cityRef.current.value = "";

      toast.success("Address added successfully!");
    } else {
      toast.error("Failed to add address!");
    }
  };

  const handleDelete = async (id: string) => {
    const data = await removeAdress(id);
    if (data?.status === "success") {
      await fetchAddresses();
      toast.success("Address deleted");
    } else {
      toast.error("Failed to delete address");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Add Address Form */}
      <div className="bg-card p-6 rounded-2xl shadow-lg border border-border transition-transform hover:scale-[1.01] duration-300">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Add New Address</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input ref={nameRef} type="text" placeholder="Name"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
          <input ref={detailsRef} type="text" placeholder="Details"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
          <input ref={phoneRef} type="text" placeholder="Phone"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
          <input ref={cityRef} type="text" placeholder="City"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
        <button
          onClick={handleAddAddress}
          className="mt-4 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          Add Address
        </button>
      </div>

      {/* Addresses List */}
      {loading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-card p-5 rounded-2xl shadow-lg border border-border relative hover:shadow-2xl transition-all duration-300"
            >
              <div className="space-y-1 text-foreground">
                <p className="font-bold text-lg">{address.name}</p>
                <p className="text-muted-foreground">{address.details}</p>
                <p className="text-muted-foreground">{address.city}</p>
                <p className="text-muted-foreground">{address.phone}</p>
              </div>

              <div className="absolute top-3 right-3">
                <button
                  onClick={() => handleDelete(address._id)}
                  className="text-destructive hover:text-destructive/80 cursor-pointer"
                  title="Delete Address"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
