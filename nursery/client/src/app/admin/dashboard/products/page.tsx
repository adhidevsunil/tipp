'use client';

import * as React from 'react';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  // Form state
  const [formData, setFormData] = React.useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category: 'Indoor',
    sunlight: 'Partial',
    watering: 'Moderate',
    difficulty: 'Easy',
    isFeatured: false,
  });

  const [imageFile, setImageFile] = React.useState<File | null>(null);

  const fetchProducts = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products?search=${search}`);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '', price: '', stock: '', description: '', category: 'Indoor',
      sunlight: 'Partial', watering: 'Moderate', difficulty: 'Easy', isFeatured: false,
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      category: product.category,
      sunlight: product.careInstructions.sunlight,
      watering: product.careInstructions.watering,
      difficulty: product.careInstructions.difficulty,
      isFeatured: product.isFeatured || false,
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });
    if (imageFile) {
      data.append('images', imageFile);
    }

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert('Error saving product');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your nursery inventory.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
             <Input 
               placeholder="Search..." 
               className="pl-9" 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
          </div>
          <Button onClick={openAddModal} className="shrink-0"><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-1">
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-sm">
                    <th className="p-4 font-medium">Product</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Stock</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white/40">
                 {loading ? (
                   <tr>
                     <td colSpan={5} className="p-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></td>
                   </tr>
                 ) : products.length === 0 ? (
                   <tr>
                     <td colSpan={5} className="p-8 text-center text-gray-500">No products found.</td>
                   </tr>
                 ) : (
                   products.map((t) => (
                     <tr key={t._id} className="hover:bg-white/60 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                               <img src={t.images[0]?.url || ''} className="h-full w-full object-cover" alt="" />
                            </div>
                            <span className="font-semibold text-gray-900 line-clamp-1">{t.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{t.category}</td>
                        <td className="p-4 font-medium text-primary">₹{t.price}</td>
                        <td className="p-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.stock > 10 ? 'bg-green-100 text-green-800' : t.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {t.stock} in stock
                           </span>
                        </td>
                        <td className="p-4 text-right">
                           <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" onClick={() => openEditModal(t)} className="h-8 w-8 text-gray-500 hover:text-primary"><Pencil className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(t._id)} className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                           </div>
                        </td>
                     </tr>
                   ))
                 )}
              </tbody>
           </table>
         </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Product' : 'Add New Product'} className="max-w-2xl">
         <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
            <div className="grid grid-cols-2 gap-4">
               <div className="col-span-2">
                 <label className="text-sm font-medium text-gray-700">Name</label>
                 <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-700">Price (₹)</label>
                 <Input type="number" required min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-700">Stock</label>
                 <Input type="number" required min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
               </div>
               <div className="col-span-2">
                 <label className="text-sm font-medium text-gray-700">Description</label>
                 <textarea required className="w-full rounded-md border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary outline-none min-h-[100px]" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
               </div>
               
               <div>
                 <label className="text-sm font-medium text-gray-700">Category</label>
                 <select className="w-full rounded-md border border-gray-200 p-2.5 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option>Indoor</option>
                    <option>Outdoor</option>
                    <option>Succulent</option>
                    <option>Flowering</option>
                    <option>Medicinal</option>
                    <option>Bonsai</option>
                    <option>Other</option>
                 </select>
               </div>
               
               <div>
                 <label className="text-sm font-medium text-gray-700">Sunlight</label>
                 <select className="w-full rounded-md border border-gray-200 p-2.5 text-sm" value={formData.sunlight} onChange={e => setFormData({...formData, sunlight: e.target.value})}>
                    <option>Low</option>
                    <option>Partial</option>
                    <option>Full</option>
                 </select>
               </div>

               <div>
                 <label className="text-sm font-medium text-gray-700">Watering</label>
                 <select className="w-full rounded-md border border-gray-200 p-2.5 text-sm" value={formData.watering} onChange={e => setFormData({...formData, watering: e.target.value})}>
                    <option>Low</option>
                    <option>Moderate</option>
                    <option>High</option>
                 </select>
               </div>

               <div>
                 <label className="text-sm font-medium text-gray-700">Difficulty</label>
                 <select className="w-full rounded-md border border-gray-200 p-2.5 text-sm" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                 </select>
               </div>
               
               <div className="col-span-2">
                 <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                   <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="accent-primary" />
                   Featured Product
                 </label>
               </div>

               <div className="col-span-2">
                 <label className="text-sm font-medium text-gray-700">Upload Image {editingId && '(Optional to update)'}</label>
                 <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} required={!editingId} />
               </div>
            </div>
            
            <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white py-2 border-t mt-4">
               <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
               <Button type="submit" isLoading={submitLoading}>{editingId ? 'Update' : 'Save'} Product</Button>
            </div>
         </form>
      </Modal>
    </div>
  );
}
