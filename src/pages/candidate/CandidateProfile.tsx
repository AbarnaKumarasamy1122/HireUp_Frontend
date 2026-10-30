import { useEffect, useState } from "react";
import { Camera, Mail, Pencil, Save } from "lucide-react";
import { getCandidateProfile, getImageKitAuth, updateCandidateProfile } from "../../services/authService";
import { getStoredValue } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";
import { imagekit } from "../../utils/imagekit";

type Profile = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string | null;
  resume_url?: string | null;
};

const CandidateProfile = () => {
  const toast = useToast();
  const { setUser } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ first_name: "", last_name: "", profile_image: "" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(getStoredValue("user") || "{}");
    if (!stored.id) return;
    getCandidateProfile(stored.id)
      .then(({ data }) => {
        setProfile(data);
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          profile_image: data.profile_image || "",
        });
      })
      .catch(() => toast.error("Unable to load your profile"))
      .finally(() => setLoading(false));
  }, []);

  const saveProfile = async () => {
    if (!profile) return;
    if (!form.first_name.trim() || !form.last_name.trim()) {
      toast.error("First name and last name are required");
      return;
    }
    try {
      setSaving(true);
      const { data } = await updateCandidateProfile(profile.id, form);
      const updated = data.user;
      setProfile(updated);
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      sessionStorage.setItem("user", JSON.stringify(updated));
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Unable to update your profile");
    } finally {
      setSaving(false);
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      setUploading(true);
      const auth = await getImageKitAuth();
      const uploaded = await imagekit.upload({
        file,
        fileName: `candidate-${profile?.id}-${file.name}`,
        folder: "/profiles",
        token: auth.data.token,
        signature: auth.data.signature,
        expire: auth.data.expire,
      });
      setForm((current) => ({ ...current, profile_image: uploaded.url }));
      toast.success("Image uploaded. Save your profile to apply it.");
    } catch {
      toast.error("Unable to upload profile image");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="card p-8 text-center text-muted">Loading profile...</div>;
  if (!profile) return <div className="card p-8 text-center text-muted">Profile unavailable.</div>;

  const name = `${profile.first_name} ${profile.last_name}`.trim() || "Candidate";
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-3xl space-y-6 fade-up">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="mt-1 text-muted">Keep your candidate information up to date.</p>
      </div>
      <div className="card overflow-hidden">
        <div className="bg-primary px-6 py-8 text-white">
          <div className="flex items-center gap-5">
            {form.profile_image ? (
              <img src={form.profile_image} alt={name} className="h-24 w-24 rounded-full border-4 border-white/40 object-cover" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/40 bg-white/20 text-2xl font-bold">{initials}</div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-white/80">Candidate</p>
            </div>
            {editing && (
              <label className="cursor-pointer rounded-lg bg-white/15 px-3 py-2 text-sm hover:bg-white/25">
                <span className="flex items-center gap-2"><Camera size={16} />{uploading ? "Uploading..." : "Upload image"}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  disabled={uploading}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void uploadProfileImage(file);
                  }}
                />
              </label>
            )}
          </div>
        </div>
        <div className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">First name</span>
              <input disabled={!editing} value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className="input disabled:opacity-60" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Last name</span>
              <input disabled={!editing} value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className="input disabled:opacity-60" />
            </label>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-200">
            <Mail size={20} className="text-primary" />
            <div><p className="text-xs text-muted">Email</p><p className="font-medium">{profile.email}</p></div>
          </div>
          <div className="flex justify-end gap-3">
            {editing ? (
              <button onClick={saveProfile} disabled={saving} className="btn-primary flex items-center gap-2 cursor-pointer disabled:opacity-50"><Save size={17} />{saving ? "Saving..." : "Save changes"}</button>
            ) : (
              <button onClick={() => setEditing(true)} className="btn-primary flex items-center gap-2 cursor-pointer"><Pencil size={17} />Edit profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
