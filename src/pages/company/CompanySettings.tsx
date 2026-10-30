import { useEffect, useState } from "react";
import { Camera, Mail, Save } from "lucide-react";
import {
  getCompanyProfile,
  getImageKitAuth,
  updateCompanyProfile,
} from "../../services/authService";
import { getStoredValue, useAuth } from "../../context/AuthContext";
import { imagekit } from "../../utils/imagekit";
import { useToast } from "../../components/Toast";

type CompanyProfile = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  company_address?: string;
  company_contact?: string;
  company_website?: string;
  company_description?: string;
  profile_image?: string | null;
};

const CompanySettings = () => {
  const toast = useToast();
  const { setUser } = useAuth();
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    company_address: "",
    company_contact: "",
    company_website: "",
    company_description: "",
    profile_image: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(getStoredValue("user") || "{}");
    if (!stored.id) return;
    getCompanyProfile(stored.id)
      .then(({ data }) => {
        setProfile(data);
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          company_name: data.company_name || "",
          company_address: data.company_address || "",
          company_contact: data.company_contact || "",
          company_website: data.company_website || "",
          company_description: data.company_description || "",
          profile_image: data.profile_image || "",
        });
      })
      .catch(() => toast.error("Unable to load company settings"))
      .finally(() => setLoading(false));
  }, []);

  const uploadProfileImage = async (file: File) => {
    if (!profile) return;
    try {
      setUploading(true);
      const auth = await getImageKitAuth();
      const uploaded = await imagekit.upload({
        file,
        fileName: `company-${profile.id}-${file.name}`,
        folder: "/profiles",
        token: auth.data.token,
        signature: auth.data.signature,
        expire: auth.data.expire,
      });
      setForm((current) => ({ ...current, profile_image: uploaded.url }));
      toast.success("Image uploaded. Save changes to apply it.");
    } catch {
      toast.error("Unable to upload company image");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!profile || !form.company_name.trim()) {
      toast.error("Company name is required");
      return;
    }
    try {
      setSaving(true);
      const { data } = await updateCompanyProfile(profile.id, form);
      const updated = data.user;
      setProfile(updated);
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      sessionStorage.setItem("user", JSON.stringify(updated));
      toast.success("Company profile updated successfully");
    } catch {
      toast.error("Unable to update company profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="card p-10 text-center text-muted">Loading company settings...</div>;
  if (!profile) return <div className="card p-10 text-center text-muted">Company profile unavailable.</div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6 fade-up">
      <div>
        <h1 className="text-3xl font-bold">Company Settings</h1>
        <p className="mt-1 text-muted">Manage your company profile and public hiring information.</p>
      </div>
      <div className="card overflow-hidden">
        <div className="bg-primary px-6 py-8 text-white">
          <div className="flex flex-wrap items-center gap-5">
            {form.profile_image ? (
              <img src={form.profile_image} alt={form.company_name} className="h-24 w-24 rounded-full border-4 border-white/40 object-cover" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/40 bg-white/20 text-2xl font-bold">{(form.company_name || "C").slice(0, 2).toUpperCase()}</div>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-2xl font-bold">{form.company_name || "Your company"}</h2>
              <p className="text-white/80">Company account</p>
            </div>
            <label className="cursor-pointer rounded-lg bg-white/15 px-3 py-2 text-sm hover:bg-white/25">
              <span className="flex items-center gap-2"><Camera size={16} />{uploading ? "Uploading..." : "Upload logo"}</span>
              <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" disabled={uploading} onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadProfileImage(file);
              }} />
            </label>
          </div>
        </div>
        <div className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2"><span className="text-sm font-medium">Contact first name</span><input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className="input" /></label>
            <label className="space-y-2"><span className="text-sm font-medium">Contact last name</span><input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className="input" /></label>
          </div>
          <label className="space-y-2"><span className="text-sm font-medium">Company name</span><input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="input" /></label>
          <div className="flex items-center gap-3 rounded-xl mt-5 bg-slate-50 p-4 dark:bg-slate-200"><Mail className="text-primary" size={20} /><div><p className="text-xs text-muted">Account email</p><p className="font-medium">{profile.email}</p></div></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2"><span className="text-sm font-medium">Contact number</span><input value={form.company_contact} onChange={(e) => setForm({ ...form, company_contact: e.target.value })} className="input" /></label>
            <label className="space-y-2"><span className="text-sm font-medium">Website</span><input type="url" value={form.company_website} onChange={(e) => setForm({ ...form, company_website: e.target.value })} className="input" /></label>
          </div>
          <label className="space-y-2"><span className="text-sm font-medium">Address</span><textarea rows={2} value={form.company_address} onChange={(e) => setForm({ ...form, company_address: e.target.value })} className="input" /></label>
          <label className="space-y-2"><span className="text-sm font-medium">Company description</span><textarea rows={5} value={form.company_description} onChange={(e) => setForm({ ...form, company_description: e.target.value })} className="input" /></label>
          <div className="flex justify-end"><button onClick={save} disabled={saving || uploading} className="btn-primary flex items-center gap-2 cursor-pointer disabled:opacity-50"><Save size={17} />{saving ? "Saving..." : "Save changes"}</button></div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
