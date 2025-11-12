import React from "react";

type FormData = {
  name: string;
  email: string;
  newPassword?: string;
  oldPassword?: string;
};

interface AccountDetailsProps {
  isUpdating: boolean;
  updateUserProfile: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function AccountDetails({
  isUpdating,
  updateUserProfile,
  formData,
  handleInputChange,
}: AccountDetailsProps) {
  return (
    <>
      <div className="lg:col-span-3">
        <form onSubmit={updateUserProfile}>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 font-inter text-black">
              Account Details
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-[#6c7275] font-inter font-bold mb-2"
                >
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-[#6c7275] font-inter font-bold mb-2"
                >
                  EMAIL
                </label>
                <input
                  disabled
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 font-inter text-black">
              Password
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="oldPassword"
                  className="block text-sm text-[#6c7275] font-inter font-bold mb-2"
                >
                  OLD PASSWORD
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="Old Password"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition placeholder-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm text-[#6c7275] font-inter font-bold mb-2"
                >
                  NEW PASSWORD
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="bg-gray-900 font-inter text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {isUpdating ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </>
  );
}
