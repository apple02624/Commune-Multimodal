
export default function WelcomeSection() {
    return (
      <section id="welcome" className="h-full pt-20 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center">
          <div className="pt-6 w-full">
            <h1 className="text-6xl pb-3 dark:text-white text-center">
              Welcome to the{" "}
              <span className="text-[#ffb4ed] dark:text-[#FFD6F5] animate-pulse duration-500">
                commune Multimodal!
              </span>
            </h1>
          </div>
        </div>
      </section>
    );
  }