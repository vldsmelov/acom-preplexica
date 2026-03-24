const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="lg:pl-20 bg-light-primary dark:bg-dark-primary min-h-screen flex flex-col">
      <div className="max-w-screen-lg lg:mx-auto mx-4 flex-1">{children}</div>
      <footer className="max-w-screen-lg lg:mx-auto mx-4 pb-24 lg:pb-6 pt-4 text-center text-xs text-black/60 dark:text-white/60">
        {'by Модуль "Цифровизация проектных задач"'}
      </footer>
    </main>
  );
};

export default Layout;
