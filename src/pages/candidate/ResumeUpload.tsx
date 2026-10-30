import { useEffect, useState } from "react";
import { UploadCloud, Pencil } from "lucide-react";

import { imagekit } from "../../utils/imagekit";
import {
  getImageKitAuth,
  updateResume,
  getCandidateProfile,
} from "../../services/authService";

import { useToast } from "../../components/Toast";
import { getStoredValue } from "../../context/AuthContext";

const ResumeUpload = () => {
  const toast = useToast();

  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [editing, setEditing] = useState(false);

  const storedUser = JSON.parse(
    getStoredValue("user") || "{}"
  );

  // =========================
  // LOAD EXISTING RESUME
  // =========================
  useEffect(() => {
    const loadResume = async () => {
      try {
        const res = await getCandidateProfile(storedUser.id);
        setResumeUrl(res.data.resume_url || "");
      } catch (err) {
        console.log(err);
      }
    };

    loadResume();
  }, []);

  // =========================
  // UPLOAD RESUME
  // =========================
  const uploadResumeFile = async (file: File) => {
    try {
      setUploading(true);

      const authRes = await getImageKitAuth();

      const uploadRes = await imagekit.upload({
        file,
        fileName: file.name,
        folder: "/resumes",
        token: authRes.data.token,
        signature: authRes.data.signature,
        expire: authRes.data.expire,
      });

      const url = uploadRes.url;

      await updateResume(storedUser.id, url);

      setResumeUrl(url);
      setEditing(false);

      toast.success("Resume uploaded successfully");
    } catch (err: any) {
      console.log(err);
      toast.error(
        err?.response?.data?.error || "Failed to upload resume"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card p-6 space-y-5 fade-up">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">My Resume</h2>

        {resumeUrl && !editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 text-md text-primary btn-secondary cursor-pointer"
          >
            <Pencil size={24} className="text-black" />
            Edit
          </button>
        )}
      </div>

      {/* ========================= */}
      {/* UPLOAD BOX */}
      {/* ========================= */}
      {editing || !resumeUrl ? (
        <label className="border-2 border-dashed border-primary rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer">
          <UploadCloud size={40} />

          <p className="mt-3">
            Upload PDF / DOC / DOCX
          </p>

          <input
            hidden
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadResumeFile(file);
            }}
          />
        </label>
      ) : null}

      {/* LOADING */}
      {uploading && (
        <p className="text-blue-500">Uploading...</p>
      )}

      {/* ========================= */}
      {/* RESUME PREVIEW */}
      {/* ========================= */}
      {resumeUrl && (
        <div className="space-y-3">
          <a
            href={resumeUrl}
            target="_blank"
            className="text-green-600 underline block"
          >
            Open Resume in new tab
          </a>

          <iframe
            src={`${resumeUrl}#toolbar=0`}
            className="w-full h-[500px] rounded-lg border border-border"
          />
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;