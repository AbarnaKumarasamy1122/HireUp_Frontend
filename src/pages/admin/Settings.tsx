import { useState } from "react";

const Settings = () => {

  const [preview, setPreview] = useState("");

  return (
    <div className="fade-up">

      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="card p-6 max-w-2xl">

        {/* PROFILE IMAGE */}
        <div className="mb-6">

          <label className="block font-medium mb-2">
            Profile Image
          </label>

          <input
            type="file"
            onChange={(e: any) => {
              const file = e.target.files[0];

              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-24 h-24 rounded-full mt-4 object-cover border"
            />
          )}

        </div>

        {/* NAME */}
        <div className="mb-4">

          <label className="block font-medium mb-2">
            First Name
          </label>

          <input
            type="text"
            placeholder="Enter first name"
            className="w-full border border-border rounded-xl px-4 py-3"
          />

          <label className="block font-medium mb-2">
            Last Name
          </label>

          <input
            type="text"
            placeholder="Enter last name"
            className="w-full border border-border rounded-xl px-4 py-3"
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-4">

          <label className="block font-medium mb-2">
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border border-border rounded-xl px-4 py-3"
          />

        </div>

        <div className="mb-6">

          <label className="block font-medium mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border border-border rounded-xl px-4 py-3"
          />

        </div>

        <button className="btn-primary">
          Save Changes
        </button>

      </div>

    </div>
  );
};

export default Settings;