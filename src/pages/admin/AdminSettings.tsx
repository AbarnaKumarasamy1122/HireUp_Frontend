import { useEffect, useState } from "react";

import {
  getAdminProfile,
  updateAdminProfile,
  getImageKitAuth,
} from "../../services/authService";

import { imagekit } from "../../utils/imagekit";
import { useToast } from "../../components/Toast";

const AdminSettings = () => {

  const toast = useToast();

  const storedUser = JSON.parse(
    sessionStorage.getItem("user") ||
    localStorage.getItem("user") ||
    "{}"
  );

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_image: "",
  });

  const [saving, setSaving] = useState(false);

  // ======================
  // LOAD ADMIN
  // ======================
  const loadAdmin = async () => {
    try {
      const res = await getAdminProfile(storedUser.id);

      setForm({
        first_name: res.data.first_name || "",
        last_name: res.data.last_name || "",
        email: res.data.email || "",
        profile_image: res.data.profile_image || "",
      });

      setPreview(res.data.profile_image || "");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmin();
  }, []);

  // ======================
  // IMAGE UPLOAD FIXED
  // ======================
  const uploadImage = async () => {
    if (!image) return form.profile_image;

    const authRes = await getImageKitAuth();

    const uploadRes = await imagekit.upload({
      file: image,
      fileName: image.name,
      token: authRes.data.token,
      signature: authRes.data.signature,
      expire: authRes.data.expire,
    });

    return uploadRes.url;
  };

  // ======================
  // UPDATE PROFILE
  // ======================
  const handleUpdate = async () => {

    if (!form.first_name || !form.last_name) {
      toast.error("First name and last name are required");
      return;
    }

    try {

      setSaving(true);
      let imageUrl = form.profile_image;

      if (image) {
        imageUrl = await uploadImage();
      }

      const res = await updateAdminProfile(storedUser.id, {
        first_name: form.first_name,
        last_name: form.last_name,
        profile_image: imageUrl,
      });

      // update storage
      sessionStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Profile updated successfully");
      setEditing(false);
      loadAdmin();

    } catch (err: any) {
      toast.error(err.response?.data?.error || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="fade-up">

      <h1 className="text-3xl font-bold mb-6">
        Admin Settings
      </h1>

      <div className="card p-6 max-w-2xl">

        {/* PROFILE IMAGE */}
        <div className="mb-6">

          <label className="block font-medium mb-3">
            Profile Image
          </label>

          <div className="flex items-center gap-5">

            <img
              src={
                preview ||
                "https://ui-avatars.com/api/?name=Admin"
              }
              className="w-24 h-24 rounded-full border border-border object-cover"
            />

            {editing && (
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            )}

          </div>
        </div>

        {/* FIRST NAME */}
        <input
          disabled={!editing}
          value={form.first_name}
          onChange={(e) =>
            setForm({ ...form, first_name: e.target.value })
          }
          className="w-full border border-border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="First Name"
        />

        {/* LAST NAME */}
        <input
          disabled={!editing}
          value={form.last_name}
          onChange={(e) =>
            setForm({ ...form, last_name: e.target.value })
          }
          className="w-full border border-border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Last Name"
        />

        {/* EMAIL (READ ONLY) */}
        <div className="mb-4">
          <label className="block text-sm text-muted mb-1">
            Email
          </label>

          <input
            value={form.email}
            disabled
            className="w-full border border-border p-3 rounded bg-gray-100 dark:bg-slate-800 cursor-not-allowed"
          />
        </div>

        {/* BUTTONS */}
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="btn-primary cursor-pointer"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={handleUpdate} disabled={saving} className="btn-primary cursor-pointer">
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setEditing(false)}
              className="border border-border p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminSettings;