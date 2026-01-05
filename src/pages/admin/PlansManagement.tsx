import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { FileUpload } from '../../components/ui/FileUpload';

interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    interval: string;
    features: string[];
    is_active: boolean;
    image_url?: string;
}

const PlansManagement = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

    // Form State
    const [formData, setFormData] = useState<Partial<Plan>>({
        name: '', description: '', price: 0, interval: 'month', features: [], is_active: true
    });
    const [featureInput, setFeatureInput] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const { data, error } = await supabase.from('plans').select('*').order('price');
            if (error) throw error;
            setPlans(data || []);
        } catch {
            toast.error('Failed to load plans');
        } finally {
            // Loading finished
        }
    };

    const handleSavePlan = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let imageUrl = formData.image_url;

            if (selectedFile) {
                const fileExt = selectedFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                // 1. Upload to Supabase Storage
                const { error: uploadError } = await supabase.storage
                    .from('plan_images')
                    .upload(filePath, selectedFile);

                if (uploadError) throw uploadError;

                // 2. Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('plan_images')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const planData = { ...formData, image_url: imageUrl };

            if (editingPlan) {
                const { error } = await supabase.from('plans').update(planData).eq('id', editingPlan.id);
                if (error) throw error;
                toast.success('Plan updated');
            } else {
                const { error } = await supabase.from('plans').insert([planData]);
                if (error) throw error;
                toast.success('Plan created');
            }
            setIsModalOpen(false);
            setEditingPlan(null);
            fetchPlans();
        } catch (error: any) {
            console.error('Error saving plan:', error);
            toast.error('Failed to save plan: ' + error.message);
        }
    };

    const handleDeletePlan = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const { error } = await supabase.from('plans').delete().eq('id', id);
            if (error) throw error;
            toast.success('Plan deleted');
            fetchPlans();
        } catch {
            toast.error('Failed to delete plan');
        }
    };

    const openModal = (plan?: Plan) => {
        if (plan) {
            setEditingPlan(plan);
            setFormData(plan);
        } else {
            setEditingPlan(null);
            setFormData({ name: '', description: '', price: 0, interval: 'month', features: [], is_active: true });
        }
        setSelectedFile(null);
        setIsModalOpen(true);
    };

    const addFeature = () => {
        if (featureInput) {
            setFormData({ ...formData, features: [...(formData.features || []), featureInput] });
            setFeatureInput('');
        }
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...(formData.features || [])];
        newFeatures.splice(index, 1);
        setFormData({ ...formData, features: newFeatures });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Plans Management</h1>
                <Button onClick={() => openModal()} icon={Plus}>Add New Plan</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                                {plan.is_active ? (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                                ) : (
                                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Inactive</span>
                                )}
                            </div>
                            {plan.image_url && (
                                <img src={plan.image_url} alt={plan.name} className="mt-3 w-full h-32 object-cover rounded-md border border-gray-100" />
                            )}
                            <p className="text-gray-500 mt-2 text-sm">{plan.description}</p>
                            <p className="mt-4 flex items-baseline gap-x-1">
                                <span className="text-3xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                                <span className="text-sm font-semibold leading-6 text-gray-600">/{plan.interval}</span>
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-gray-600">
                                {plan.features?.slice(0, 4).map((f, i) => (
                                    <li key={i} className="flex items-center"><Check size={14} className="text-green-500 mr-2" /> {f}</li>
                                ))}
                                {(plan.features?.length || 0) > 4 && <li>+ {(plan.features?.length || 0) - 4} more...</li>}
                            </ul>
                        </div>
                        <div className="mt-6 flex space-x-3 pt-4 border-t border-gray-100">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => openModal(plan)} icon={Edit2}>Edit</Button>
                            <Button variant="danger" size="sm" className="flex-1" onClick={() => handleDeletePlan(plan.id)} icon={Trash2}>Delete</Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
                        <h2 className="text-xl font-bold mb-6">{editingPlan ? 'Edit Plan' : 'Create New Plan'}</h2>
                        <form onSubmit={handleSavePlan} className="space-y-4">
                            <Input label="Plan Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            <Input label="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} required />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Interval</label>
                                    <select
                                        value={formData.interval}
                                        onChange={e => setFormData({ ...formData, interval: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 p-2.5"
                                    >
                                        <option value="month">Monthly</option>
                                        <option value="year">Yearly</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Image</label>
                                <FileUpload
                                    label={formData.image_url ? "Change Image" : "Upload Image"}
                                    onFileSelect={(file) => setSelectedFile(file)}
                                />
                                {(selectedFile || formData.image_url) && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">Preview:</p>
                                        <img
                                            src={selectedFile ? URL.createObjectURL(selectedFile) : formData.image_url}
                                            alt="Preview"
                                            className="h-32 w-full object-cover rounded-md border border-gray-200"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                                <div className="flex gap-2 mb-2">
                                    <Input value={featureInput} onChange={e => setFeatureInput(e.target.value)} placeholder="Add feature..." className="mb-0" />
                                    <Button type="button" onClick={addFeature} variant="secondary">Add</Button>
                                </div>
                                <div className="space-y-2">
                                    {formData.features?.map((f, i) => (
                                        <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                            <span className="text-sm">{f}</span>
                                            <button type="button" onClick={() => removeFeature(i)} className="text-red-500"><X size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit">Save Plan</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlansManagement;
