import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Key, Info, Save, FolderArchive, Share, AlertTriangle, Trash2, LogOut } from "lucide-react"

function SettingsPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl space-y-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
            Security Settings
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage your master credentials and data access from one place.
          </p>
        </div>

        {/* Main Settings Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          {/* Card Header */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-6 py-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg">
                <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                  Access Control
                </h2>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">
                  UPDATE MASTER PASSWORD
                </p>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            {/* Info Banner */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-1">Password Requirements</p>
                <p className="text-blue-700 dark:text-blue-300">
                  Use at least 12 characters with a mix of uppercase, lowercase, numbers, and symbols.
                </p>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5">
              {/* Current Password */}
              <div className="space-y-2">
                <label
                  htmlFor="current-master-password"
                  className="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
                >
                  Current Master Password
                </label>
                <input
                  type="password"
                  id="current-master-password"
                  className="w-full px-4 py-2.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="Enter your current password"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* New Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="new-master-password"
                    className="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
                  >
                    New Master Password
                  </label>
                  <input
                    type="password"
                    id="new-master-password"
                    className="w-full px-4 py-2.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Enter a strong password"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirm-new-master-password"
                    className="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
                  >
                    Confirm New Master Password
                  </label>
                  <input
                    type="password"
                    id="confirm-new-master-password"
                    className="w-full px-4 py-2.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                >
                  <Save className="w-4 h-4 inline-block mr-2 -mt-1" />
                  Update Password
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          {/* Card Header */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg">
                  <FolderArchive className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                    Data Sovereignty
                  </h2>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">
                    BACKUP AND EXPORT
                  </p>
                </div>
              </div>

              <Badge variant={"outline"}>
                Coming Soon
              </Badge>
            </div>
          </div>

          <div className="p-6 flex justify-between items-center md:flex-row flex-col md:gap-0 gap-4">
            <p className="text-neutral-700 dark:text-neutral-500 text-sm">
              Download an encrypted JSON copy of your entire vault for offline storage. This feature will come later
            </p>
            <Button variant={"default"} size={"sm"} disabled>
              <Share className="w-4 h-4 mr-2" />
              Export Vault
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          {/* Card Header */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-950 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                    Danger Zone
                  </h2>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">
                    THINK BEFORE YOU ACT
                  </p>
                </div>
              </div>

              <Badge variant={"outline"} className="hidden">
                Coming Soon
              </Badge>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="p-6 flex justify-between items-center md:flex-row flex-col md:gap-0 gap-4">
              <p className="text-neutral-700 dark:text-neutral-500 text-sm">
                Sign out from all devices to protect your account if you suspect unauthorized access.
              </p>
              <Button variant={"default"} size={"sm"} className="border-red-600 bg-red-500 hover:bg-red-600 focus:ring-red-600 text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out All Devices
              </Button>
            </div>
            <div className="p-6 flex justify-between items-center md:flex-row flex-col md:gap-0 gap-4">
              <p className="text-neutral-700 dark:text-neutral-500 text-sm">
                Permanently delete all your data from Hushbox servers. This action is irreversible.
              </p>
              <Button variant={"default"} size={"sm"} className="border-red-600 bg-red-500 hover:bg-red-600 focus:ring-red-600 text-white">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Hushbox Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SettingsPage