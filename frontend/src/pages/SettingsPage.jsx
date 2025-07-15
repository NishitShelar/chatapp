import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl animate-fade-in">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-primary">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all shadow-lg ${theme === t ? "border-primary bg-base-200" : "border-base-200 bg-base-100 hover:bg-base-200"}`}
              onClick={() => setTheme(t)}
              data-theme={t}
            >
              <div className="w-full h-12 rounded-lg mb-2 bg-base-200 border border-base-300" data-theme={t}></div>
              <span className="text-base font-medium text-primary group-hover:text-primary-focus transition-all capitalize">
                {t}
              </span>
              {theme === t && <span className="text-xs text-primary font-semibold">Selected</span>}
            </button>
          ))}
        </div>
        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3 text-primary">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg animate-fade-in" data-theme={theme}>
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100 flex items-center gap-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">J</div>
                  <div>
                    <h3 className="font-medium text-sm text-primary">John Doe</h3>
                    <p className="text-xs text-base-content/70">Online</p>
                  </div>
                </div>
                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100 animate-fade-in">
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-xl p-3 shadow-sm bg-base-200 text-base-content">
                      <p className="text-sm">Hey! How's it going?</p>
                      <p className="text-[10px] mt-1.5 text-base-content/70">12:00 PM</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-xl p-3 shadow-sm bg-primary text-primary-content">
                      <p className="text-sm">I'm doing great! Just working on some new features.</p>
                      <p className="text-[10px] mt-1.5 text-primary-content/70">12:01 PM</p>
                    </div>
                  </div>
                </div>
                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100 animate-fade-in">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10 bg-base-100"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn bg-primary text-primary-content h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;