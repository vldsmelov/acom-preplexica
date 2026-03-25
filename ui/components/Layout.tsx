const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="lg:pl-20 bg-light-primary dark:bg-dark-primary min-h-screen flex flex-col">
      <div className="max-w-screen-lg lg:mx-auto mx-4 flex-1 pb-24 lg:pb-16">
        {children}
      </div>
      <footer className="fixed left-0 right-0 lg:left-20 bottom-16 lg:bottom-2 z-30 pointer-events-none">
        <div className="mx-auto w-fit rounded-full border border-light-200 dark:border-dark-200 bg-light-primary/90 dark:bg-dark-primary/90 px-3 py-1 text-center text-xs font-medium text-black/70 dark:text-white/70 backdrop-blur-sm">
          by Модуль &quot;Цифровизация проектных задач&quot;
        </div>
      </footer>
    </main>
  );
};

export default Layout;
